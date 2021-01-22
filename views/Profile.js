import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  console.log('Profile', user);

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Login');
  };

  return (
    <View>
      <Text>Email: {user.email}</Text>
      <Text>Fullname: {user.fullname}</Text>
      <Text>Username: {user.username}</Text>
      <Button title={'Logout'} onPress={logout} />
    </View>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
