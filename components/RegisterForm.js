import React from 'react';
import {View, Button, Text} from 'react-native';
import PropTypes from 'prop-types';
import FormTextInput from './FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';

const RegisterForm = ({navigation}) => {
  const {handleInputChange} = useSignUpForm();

  const doRegister = () => {};

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
