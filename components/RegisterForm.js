import React, {useContext} from 'react';
import {View, Button, Text, Alert} from 'react-native';
import PropTypes from 'prop-types';
import FormTextInput from './FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';
import {register, login} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterForm = ({
  navigation,
  style,
  titleStyle,
  inputStyle,
  buttonColor,
}) => {
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
    <View style={style}>
      <Text style={titleStyle}>Register:</Text>
      <FormTextInput
        autoCapitalize="none"
        placeholder="Username"
        style={inputStyle}
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Password"
        style={inputStyle}
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Email"
        style={inputStyle}
        onChangeText={(txt) => handleInputChange('email', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Full name"
        style={inputStyle}
        onChangeText={(txt) => handleInputChange('full_name', txt)}
      />
      <Button title="Register" color={buttonColor} onPress={doRegister} />
    </View>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  buttonColor: PropTypes.string,
};

export default RegisterForm;
