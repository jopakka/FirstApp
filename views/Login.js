import React, {useContext, useEffect} from 'react';
import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useContext(MainContext);
  const {postLogin, checkToken} = useLogin();

  const logIn = async () => {
    const testUser = {
      username: 'joonaun',
      password: 'passu2',
    };

    try {
      const user = await postLogin(testUser);
      await AsyncStorage.setItem('userToken', user.token);
      setIsLoggedIn(true);
    } catch (e) {
      console.error('postLogin', e.message);
      // TODO: Inform user that something went wrong
    }
  };

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    if (userToken === null) return;

    try {
      await checkToken(userToken);
      setIsLoggedIn(true);
    } catch (e) {
      console.error('getToken', e.message);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Login</Text>
      <LoginForm navigation={navigation} />
      <RegisterForm navigation={navigation} />
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
