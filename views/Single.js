import React from 'react';
import {SafeAreaView, Text, Image, StyleSheet} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import {StatusBar} from 'expo-status-bar';

const baseUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = ({route}) => {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Image
        source={{uri: baseUrl + route.params.media.filename}}
        style={styles.img}
      />
      <Text style={styles.title}>{route.params.media.title}</Text>
      <Text style={styles.desc}>{route.params.media.description}</Text>
      <StatusBar style="auto" backgroundColor="orange" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 300,
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
