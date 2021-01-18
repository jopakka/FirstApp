import React, {useContext, useEffect} from 'react';
import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useContext(MainContext);

  const logIn = async () => {
    setIsLoggedIn(true);
    await AsyncStorage.setItem('userToken', 'abc');
    navigation.navigate('Home');
  };

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    if (userToken === 'abc') {
      setIsLoggedIn(true);
      navigation.navigate('Home');
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
      <StatusBar style="auto" backgroundColor="orange" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
