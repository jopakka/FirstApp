import React, {useContext, useState} from 'react';
import {View, Alert} from 'react-native';
import PropTypes from 'prop-types';
import useLoginForm from '../hooks/LoginHooks';
import {login} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input, Text, Button, Card} from 'react-native-elements';
import {validator, constraints} from '../utils/validator';

const LoginForm = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {inputs, handleInputChange} = useLoginForm();
  const [loading, setLoading] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState();
  const [passwordStatus, setPasswordStatus] = useState();

  const doLogin = async () => {
    setLoading(true);
    try {
      const serverResponse = await login(inputs);
      await AsyncStorage.setItem('userToken', serverResponse.token);
      setUser(serverResponse.user);
      setIsLoggedIn(true);
      setLoading(false);
      navigation.navigate('Home');
    } catch (e) {
      // console.error('doLogin', e.message);
      setLoading(false);
      Alert.alert('Login failed', e.message);
    }
  };

  const checkUsername = (password) => {
    const errors = validator('password', password, constraints);
    setUsernameStatus(errors);
  };

  const checkPassword = (password) => {
    const errors = validator('password', password, constraints);
    setPasswordStatus(errors);
  };

  return (
    <Card>
      <Text h4>Login:</Text>
      <Input
        placeholder="Username"
        autoCapitalize="none"
        onChangeText={(txt) => handleInputChange('username', txt)}
        onEndEditing={(evt) => {
          const text = evt.nativeEvent.text;
          checkUsername(text);
        }}
      />
      <Input
        autoCapitalize="none"
        placeholder="Password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        onEndEditing={(evt) => {
          const text = evt.nativeEvent.text;
          checkPassword(text);
        }}
        secureTextEntry={true}
      />
      <Button title="Login" onPress={doLogin} loading={loading} />
    </Card>
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
