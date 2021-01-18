import React from 'react';
import {View, StyleSheet} from 'react-native';
import List from '../components/List';
import {StatusBar} from 'expo-status-bar';
import PropTypes from 'prop-types';

const Home = ({navigation}) => {
  return (
    <View>
      <List navigation={navigation} />
      <StatusBar style="auto" backgroundColor="orange" />
    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Home;
