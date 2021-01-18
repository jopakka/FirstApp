import React from 'react';
import {View, StyleSheet} from 'react-native';
import List from '../components/List';
import {StatusBar} from 'expo-status-bar';
import PropTypes from 'prop-types';

const Home = (props) => {
  return (
    <View>
      <List navigation={props.navigation} />
      <StatusBar style="auto" backgroundColor="orange" />
    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
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
