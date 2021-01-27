import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {ScrollView} from 'react-native';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import GlobalStyles from '../styles/GlobalStyles';
import {TouchableHighlight} from 'react-native';
import {TouchableOpacity} from 'react-native';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {checkToken} = useUser();
  const [formToggle, setFormToggle] = useState(true);

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    if (userToken === null) return;

    try {
      const user = await checkToken(userToken);
      setUser(user);
      setIsLoggedIn(true);
    } catch (e) {
      console.error('getToken', e.message);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.title}>
          <Text h1>Image app</Text>
        </View>
        <View style={styles.form}>
          {formToggle ? (
            <LoginForm navigation={navigation} style={styles.form} />
          ) : (
            <RegisterForm navigation={navigation} style={styles.form} />
          )}
          <TouchableOpacity
            style={styles.toggleText}
            onPress={() => setFormToggle(!formToggle)}
          >
            <Text>
              {formToggle
                ? 'No account yet? Register here'
                : 'Already have an account? Login here'}
            </Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" backgroundColor="orange" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
    alignItems: 'stretch',
  },
  form: {
    flex: 3,
  },
  title: {
    flex: 1,
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    paddingTop: 20,
    alignItems: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
