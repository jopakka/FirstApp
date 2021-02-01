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
  const [usernameStatus, setUsernameStatus] = useState({
    ok: false,
    message: '',
  });
  const [passwordStatus, setPasswordStatus] = useState({
    ok: false,
    message: '',
  });
  const [emailStatus, setEmailStatus] = useState({ok: false, message: ''});
  const [passwordConfirm, setPasswordConfirm] = useState(true);
  const [tempPassword, setTempPassword] = useState();
  const {register, checkIfUsernameExists} = useUser();

  const doRegister = async () => {
    setLoading(true);

    await checkUsername();
    checkPassword();
    isPasswordSame();
    checkEmail();

    console.log('usernameStatus', usernameStatus.ok);
    console.log('passwordStatus', passwordStatus.ok);
    console.log('passwordConfirm', passwordConfirm);
    console.log('emailStatus', emailStatus.ok);

    if (
      !usernameStatus.ok ||
      !passwordStatus.ok ||
      !passwordConfirm ||
      !emailStatus.ok
    ) {
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
      setUsernameStatus({ok: errors ? true : false, message: errors});
      return;
    }
    try {
      const response = await checkIfUsernameExists(inputs.username);
      setUsernameStatus({
        ok: response.available,
        message: response.available ? null : 'Username already exists',
      });
    } catch (e) {
      setUsernameStatus({ok: true, message: ''});
    }
  };

  const checkPassword = () => {
    const errors = validator('password', inputs.password, constraints);
    setPasswordStatus({ok: errors === null ? true : false, message: errors});
  };

  const checkEmail = () => {
    const errors = validator('email', inputs.email, constraints);
    setEmailStatus({ok: errors === null ? true : false, message: errors});
  };

  const isPasswordSame = () => {
    setPasswordConfirm(tempPassword === inputs.password);
  };

  return (
    <Card>
      <Text h4>Register:</Text>
      <Input
        autoCapitalize="none"
        placeholder="Username"
        errorMessage={usernameStatus.message}
        onChangeText={(txt) => handleInputChange('username', txt)}
        onEndEditing={(evt) => {
          const text = evt.nativeEvent.text;
          checkUsername();
        }}
      />
      <Input
        autoCapitalize="none"
        placeholder="Password"
        errorMessage={passwordStatus.message}
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
        onChangeText={(txt) => setTempPassword(txt)}
        onEndEditing={() => isPasswordSame()}
        secureTextEntry={true}
      />
      <Input
        autoCapitalize="none"
        placeholder="Email"
        errorMessage={emailStatus.message}
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
