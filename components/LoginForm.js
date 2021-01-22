import React from 'react';
import {View, Button, Text} from 'react-native';
import PropTypes from 'prop-types';
import FormTextInput from './FormTextInput';
import useLoginForm from '../hooks/LoginHooks';
import {login} from '../hooks/ApiHooks';

const LoginForm = ({navigation}) => {
  const {inputs, handleInputChange} = useLoginForm();

  const doLogin = async () => {
    const serverResponse = await login(inputs);
    if (serverResponse) {
      Alert.alert(serverResponse.message);
    } else {
      Alert.alert('register failed');
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
      <Button title="Register!" onPress={doLogin} />
    </View>
  );
};

LoginForm.propTypes = {
  navigation: PropTypes.object,
};

export default LoginForm;
