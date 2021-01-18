import React, {useContext} from 'react';
import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';

const Login = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useContext(MainContext);
  const logIn = () => {
    setIsLoggedIn(true);
    if (isLoggedIn) {
      // this is to make sure isLoggedIn has changed, will be removed later
      navigation.navigate('Home');
    }
  };
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
