import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {checkToken} = useLogin();

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    if (userToken === null) return;

    try {
      const user = await checkToken(userToken);
      setUser(user);
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboard}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <LoginForm
              navigation={navigation}
              style={styles.smallSpace}
              titleStyle={styles.title}
              inputStyle={styles.input}
              buttonColor={'#32CD32'}
            />
            <RegisterForm
              navigation={navigation}
              titleStyle={styles.title}
              inputStyle={styles.input}
              buttonColor={'#32CD32'}
            />
            <StatusBar style="auto" backgroundColor="orange" />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  smallSpace: {
    marginBottom: 30,
  },
  keyboard: {
    flex: 1,
    width: '100%',
  },
  input: {
    marginBottom: 8,
  },
  inner: {
    padding: '20%',
  },
  title: {
    fontSize: 24,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
