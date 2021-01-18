import React from 'react';
import {View, Text} from 'react-native';
import {StatusBar} from 'expo-status-bar';

const Profile = () => {
  return (
    <View>
      <Text>Profile view</Text>
      <StatusBar style="auto" backgroundColor="orange" />
    </View>
  );
};

export default Profile;
