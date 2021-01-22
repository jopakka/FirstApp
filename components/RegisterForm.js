import React, {useContext} from 'react';
import {View, Button, Text, Alert} from 'react-native';
import PropTypes from 'prop-types';
import FormTextInput from './FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';
import {register, login} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterForm = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {inputs, handleInputChange} = useSignUpForm();

  const doRegister = async () => {
    try {
      await register(inputs);
      // console.log('serverResponse', serverResponse);
      const loginResponse = await login(inputs);
      // console.log('loginResponse', loginResponse);
      await AsyncStorage.setItem('userToken', loginResponse.token);
      setUser(loginResponse.user);
      setIsLoggedIn(true);
      navigation.navigate('Home');
    } catch (e) {
      // console.error('doRegister', e.message);
      Alert.alert('Register failed', e.message);
    }
  };

  return (
    <View>
      <Text>Register:</Text>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
      />
      <Button title="Register!" onPress={doRegister} />
    </View>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterForm;
