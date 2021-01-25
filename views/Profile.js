import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Text} from 'react-native-elements';
import {uploadsUrl} from '../utils/variables';
import {useTag, useLoadMedia} from '../hooks/ApiHooks';
import {ActivityIndicator} from 'react-native';

const Profile = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatarUrl, setAvatarUrl] = useState(
    'http://placekitten.com/g/300/300'
  );
  const {getFilesByTag} = useTag();
  const {loadMediaInfo} = useLoadMedia();
  console.log('Profile', user);

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Login');
  };

  const getProfilePic = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const imgs = await getFilesByTag('avatar_' + user.user_id, token);
      if (imgs.length > 0) {
        setAvatarUrl(uploadsUrl + imgs.pop().filename);
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    getProfilePic();
  }, []);

  return (
    <Card>
      <Card.Image
        // Profile pic here
        source={{uri: avatarUrl}}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator color="white" size="large" />}
      />
      <Card.Title>
        <Text h2>{user.username}</Text>
      </Card.Title>
      <Card.FeaturedSubtitle style={{color: 'black'}}>
        Email: {user.email}
      </Card.FeaturedSubtitle>
      {user.full_name ? (
        <Card.FeaturedSubtitle style={{color: 'black'}}>
          Fullname: {user.full_name}
        </Card.FeaturedSubtitle>
      ) : (
        <></>
      )}
      <Card.Divider />
      <Button title={'Logout'} onPress={logout} />
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
