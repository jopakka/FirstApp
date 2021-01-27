import React, {useContext, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import useSignUpForm from '../hooks/RegisterHooks';
import {useUser, login} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input, Text, Button, Card} from 'react-native-elements';

const RegisterForm = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {inputs, handleInputChange} = useSignUpForm();
  const [loading, setLoading] = useState(false);
  const [unOk, setUnOk] = useState(true);
  const {register, checkIfUsernameExists} = useUser();

  const doRegister = async () => {
    setLoading(true);
    try {
      await register(inputs);
      // console.log('serverResponse', serverResponse);
      const loginResponse = await login(inputs);
      // console.log('loginResponse', loginResponse);
      await AsyncStorage.setItem('userToken', loginResponse.token);
      setUser(loginResponse.user);
      setIsLoggedIn(true);
      setLoading(false);
      navigation.navigate('Home');
    } catch (e) {
      setLoading(false);
      // console.error('doRegister', e.message);
      Alert.alert('Register failed', e.message);
    }
  };

  const checkUsername = async (username) => {
    try {
      const response = await checkIfUsernameExists(username);
      console.log('checkUsername', response);
      setUnOk(response.available);
    } catch (e) {
      console.error('checkUsername', e.message);
    }
  };

  return (
    <Card>
      <Text h4>Register:</Text>
      <Input
        autoCapitalize="none"
        placeholder="Username"
        errorMessage={unOk ? null : 'Username already exists'}
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
        secureTextEntry={true}
      />
      <Input
        autoCapitalize="none"
        placeholder="Email"
        onChangeText={(txt) => handleInputChange('email', txt)}
      />
      <Input
        autoCapitalize="none"
        placeholder="Full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
      />
      <Button title="Register" onPress={doRegister} loading={loading} />
    </Card>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 2,
  },
});

RegisterForm.propTypes = {
  navigation: PropTypes.object,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  buttonColor: PropTypes.string,
};

export default RegisterForm;
