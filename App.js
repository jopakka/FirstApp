import React from 'react';
import {SafeAreaView, StyleSheet, ImageBackground, Text} from 'react-native';
import GlobalStyles from './styles/GlobalStyles';
import List from './components/List';
import {StatusBar} from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <ImageBackground
        style={styles.img}
        source={require('./assets/catbg.jpg')}
      >
        <Icon style={styles.icon} name="bars" size={35} />
        <Text style={styles.text}>Ebin cat app</Text>
      </ImageBackground>
      <List style={styles.list} />
      <StatusBar style="auto" backgroundColor="orange" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 150,
  },
  text: {
    position: 'absolute',
    top: 8,
    backgroundColor: '#00000099',
    fontSize: 40,
    color: 'white',
    alignSelf: 'flex-end',
    paddingHorizontal: 8,
  },
  icon: {
    top: 8,
    left: 8,
    color: 'white',
  },
});

export default App;
