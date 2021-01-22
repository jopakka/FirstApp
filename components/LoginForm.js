import React, {useContext} from 'react';
import {View, Button, Text, Alert} from 'react-native';
import PropTypes from 'prop-types';
import FormTextInput from './FormTextInput';
import useLoginForm from '../hooks/LoginHooks';
import {login} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm = ({
  navigation,
  style,
  titleStyle,
  inputStyle,
  buttonColor,
}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {inputs, handleInputChange} = useLoginForm();

  const doLogin = async () => {
    try {
      const serverResponse = await login(inputs);
      await AsyncStorage.setItem('userToken', serverResponse.token);
      setUser(serverResponse.user);
      setIsLoggedIn(true);
      navigation.navigate('Home');
    } catch (e) {
      // console.error('doLogin', e.message);
      Alert.alert('Login failed', e.message);
    }
  };

  return (
    <View style={style}>
      <Text style={titleStyle}>Login:</Text>
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
      <Button title="Login" color={buttonColor} onPress={doLogin} />
    </View>
  );
};

LoginForm.propTypes = {
  navigation: PropTypes.object,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  buttonColor: PropTypes.string,
};

export default LoginForm;
