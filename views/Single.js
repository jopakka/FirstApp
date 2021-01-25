import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {uploadsUrl} from '../utils/variables';
import {Card, Image} from 'react-native-elements';
import {useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';

const Single = ({route}) => {
  const [poster, setPoster] = useState('');

  const {getUserInfoById} = useUser();

  const getUserInfo = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const user = await getUserInfoById(route.params.media.user_id, token);
      setPoster(user.username);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Card>
      <Card.Title style={styles.title}>{route.params.media.title}</Card.Title>
      <Card.Image
        source={{uri: uploadsUrl + route.params.media.filename}}
        style={styles.img}
        PlaceholderContent={<ActivityIndicator color="white" size="large" />}
      />
      <Text style={styles.desc}>{route.params.media.description}</Text>
      <Text style={[styles.desc, {fontWeight: 'bold'}]}>By: {poster}</Text>
      <StatusBar style="auto" backgroundColor="orange" />
    </Card>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 300,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  desc: {
    margin: 10,
  },
});

export default Single;
