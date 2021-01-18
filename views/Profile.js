import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';

const Profile = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useContext(MainContext);
  const logout = () => {
    setIsLoggedIn(false);
    if (!isLoggedIn) {
      // this is to make sure isLoggedIn has changed, will be removed later
      navigation.navigate('Login');
    }
  };
  return (
    <View>
      <Text>Profile</Text>
      <Button title={'Logout'} onPress={logout} />
    </View>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
