import React from 'react';
import {View} from 'react-native';
import List from '../components/List';
import {StatusBar} from 'expo-status-bar';
import PropTypes from 'prop-types';

const MyFiles = ({navigation}) => {
  return (
    <View>
      <List navigation={navigation} myFilesOnly />
      <StatusBar style="auto" backgroundColor="orange" />
    </View>
  );
};

MyFiles.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MyFiles;
