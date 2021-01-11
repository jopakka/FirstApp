import React from 'react';
import {SafeAreaView} from 'react-native';
import GlobalStyles from './styles/GlobalStyles';
import List from './components/List';
import {StatusBar} from 'expo-status-bar';

const App = () => {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <List />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default App;
