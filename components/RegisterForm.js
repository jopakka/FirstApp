import React, {useContext, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import useSignUpForm from '../hooks/RegisterHooks';
import {useUser, login} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input, Text, Button, Card} from 'react-native-elements';
import {validator, constraints} from '../utils/validator';

const RegisterForm = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {inputs, handleInputChange} = useSignUpForm();
  const [loading, setLoading] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState();
  const [passwordStatus, setPasswordStatus] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState(true);
  const [emailStatus, setEmailStatus] = useState();
  const {register, checkIfUsernameExists} = useUser();

  const doRegister = async () => {
    setLoading(true);

    if (usernameStatus || passwordStatus || emailStatus || !passwordConfirm) {
      checkUsername();
      checkPassword();
      checkEmail();
      isPasswordSame();
      setLoading(false);
      return;
    }

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

  const checkUsername = async () => {
    const errors = validator('username', inputs.username, constraints);
    if (errors) {
      setUsernameStatus(errors);
      return;
    }
    try {
      const response = await checkIfUsernameExists(inputs.username);
      setUsernameStatus(response.available ? null : 'Username already exists');
    } catch (e) {
      console.error('checkUsername', e.message);
      setUsernameStatus();
    }
  };

  const checkPassword = () => {
    const errors = validator('password', inputs.password, constraints);
    setPasswordStatus(errors);
  };

  const checkEmail = () => {
    const errors = validator('email', inputs.email, constraints);
    setEmailStatus(errors);
  };

  const isPasswordSame = (pass) => {
    setPasswordConfirm(pass === inputs.password);
  };

  return (
    <Card>
      <Text h4>Register:</Text>
      <Input
        autoCapitalize="none"
        placeholder="Username"
        errorMessage={usernameStatus}
        onChangeText={(txt) => handleInputChange('username', txt)}
        onEndEditing={(evt) => {
          const text = evt.nativeEvent.text;
          checkUsername();
        }}
      />
      <Input
        autoCapitalize="none"
        placeholder="Password"
        errorMessage={passwordStatus}
        onChangeText={(txt) => handleInputChange('password', txt)}
        onEndEditing={(evt) => {
          const text = evt.nativeEvent.text;
          checkPassword();
        }}
        secureTextEntry={true}
      />
      <Input
        autoCapitalize="none"
        placeholder="Confirm password"
        errorMessage={!passwordConfirm ? 'Passwords must be same' : null}
        onChangeText={(txt) => isPasswordSame(txt)}
        secureTextEntry={true}
      />
      <Input
        autoCapitalize="none"
        placeholder="Email"
        errorMessage={emailStatus}
        onChangeText={(txt) => handleInputChange('email', txt)}
        onEndEditing={(evt) => {
          const text = evt.nativeEvent.text;
          checkEmail();
        }}
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
