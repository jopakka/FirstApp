import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import {StatusBar} from 'expo-status-bar';

const Profile = () => {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Text>Profile view</Text>
      <StatusBar style="auto" backgroundColor="orange" />
    </SafeAreaView>
  );
};

export default Profile;
