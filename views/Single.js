import React, {useEffect, useState} from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {uploadsUrl} from '../utils/variables';
import {Card} from 'react-native-elements';
import {useFavourites, useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import {Video} from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';

const Single = ({route}) => {
  const [poster, setPoster] = useState('');
  const {getUserInfoById} = useUser();
  const {getFavouritesByFileid} = useFavourites();
  const file = route.params.media;
  const [fileHeight, setFileHeight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoRef, setVideoRef] = useState(null);
  const [likes, setLikes] = useState([]);

  const getUserInfo = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const user = await getUserInfoById(file.user_id, token);
      setPoster(user.username);
    } catch (e) {
      console.error(e.message);
    }
  };

  const unlock = async () => {
    try {
      await ScreenOrientation.unlockAsync();
    } catch (e) {
      console.error('Single unlock', e.message);
    }
  };
  const lock = async () => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    } catch (e) {
      console.error('Single lock', e.message);
    }
  };

  const setVideoComponent = (ref) => {
    setVideoRef(ref);
  };

  const showVideoInFullscreen = async (show = true) => {
    try {
      if (show) await videoRef.presentFullscreenPlayer();
      else await videoRef.dismissFullscreenPlayer();
    } catch (e) {
      console.error('showVideoInFullscreen', e.message);
    }
  };

  const getLikes = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const likes = await getFavouritesByFileid(file.file_id, token);
      // console.log('likes', likes);
      setLikes(likes);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    unlock();
    getUserInfo();
    getLikes();

    return () => {
      lock();
    };
  }, []);

  useEffect(() => {
    const sub = ScreenOrientation.addOrientationChangeListener((evt) => {
      if (videoRef) {
        if (evt.orientationInfo.orientation !== 1) {
          showVideoInFullscreen();
        } else {
          showVideoInFullscreen(false);
        }
      }
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListener(sub);
    };
  }, [videoRef]);

  return (
    <ScrollView>
      <Card>
        <Card.Title style={styles.title}>{file.title}</Card.Title>
        {file.media_type === 'image' ? (
          <Card.Image
            source={{uri: uploadsUrl + file.filename}}
            style={styles.img}
            PlaceholderContent={
              <ActivityIndicator color="white" size="large" />
            }
          />
        ) : (
          <Video
            source={{uri: uploadsUrl + file.filename}}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            style={[styles.img, fileHeight && {height: fileHeight}]}
            resizeMode="contain"
            useNativeControls
            isLooping
            onReadyForDisplay={(evt) => {
              setFileHeight(evt.naturalSize.height);
              setLoading(false);
            }}
            onError={(e) => console.error('video', e.message)}
            usePoster={loading}
            posterSource={{uri: uploadsUrl + file.screenshot}}
            ref={setVideoComponent}
          />
        )}
        <Text style={styles.desc}>{file.description}</Text>
        <Text style={[styles.desc, {fontWeight: 'bold'}]}>By: {poster}</Text>
        <Text style={[styles.desc, styles.likes]}>Likes: {likes.length}</Text>
        <StatusBar style="auto" backgroundColor="orange" />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  desc: {
    margin: 10,
  },
  likes: {
    color: 'black',
  },
});

export default Single;
