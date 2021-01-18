import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import List from '../components/List';
import {StatusBar} from 'expo-status-bar';

const Home = () => {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <List style={styles.list} />
      <StatusBar style="auto" backgroundColor="orange" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 150,
  },
  text: {
    position: 'absolute',
    top: 8,
    backgroundColor: '#00000099',
    fontSize: 40,
    color: 'white',
    alignSelf: 'flex-end',
    paddingHorizontal: 8,
  },
  icon: {
    top: 8,
    left: 8,
    color: 'white',
  },
});

export default Home;
