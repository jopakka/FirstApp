import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {uploadsUrl} from '../utils/variables';
import AsyncImage from '../components/AsyncImage';

const Single = ({route}) => {
  return (
    <View>
      <AsyncImage
        source={{uri: uploadsUrl + route.params.media.filename}}
        style={styles.img}
      />
      <Text style={styles.title}>{route.params.media.title}</Text>
      <Text style={styles.desc}>{route.params.media.description}</Text>
      <StatusBar style="auto" backgroundColor="orange" />
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 300,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  desc: {
    margin: 10,
  },
});

export default Single;
