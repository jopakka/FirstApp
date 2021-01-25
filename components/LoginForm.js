import React, {useContext, useState} from 'react';
import {View, Alert} from 'react-native';
import PropTypes from 'prop-types';
import useLoginForm from '../hooks/LoginHooks';
import {login} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input, Text, Button, Card} from 'react-native-elements';

const LoginForm = ({navigation, style, titleStyle, inputStyle}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {inputs, handleInputChange} = useLoginForm();
  const [loading, setLoading] = useState(false);

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

  return (
    <Card style={style}>
      <Text h3 h3Style={titleStyle}>
        Login:
      </Text>
      <Input
        placeholder="Username"
        autoCapitalize="none"
        style={inputStyle}
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <Input
        autoCapitalize="none"
        placeholder="Password"
        style={inputStyle}
        onChangeText={(txt) => handleInputChange('password', txt)}
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
