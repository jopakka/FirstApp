import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import GlobalStyles from './styles/GlobalStyles';
import FlatListStyles from './styles/FlatListStyles';

const mediaArray = [
  {
    key: '0',
    title: 'Title 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales enim eget leo condimentum vulputate. Sed lacinia consectetur fermentum. Vestibulum lobortis purus id nisi mattis posuere. Praesent sagittis justo quis nibh ullamcorper, eget elementum lorem consectetur. Pellentesque eu consequat justo, eu sodales eros.',
    thumbnails: {
      w160: 'http://placekitten.com/160/161',
    },
    filename: 'http://placekitten.com/2048/1920',
  },
  {
    key: '1',
    title: 'Title 2',
    description:
      'Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. Vestibulum tincidunt sapien eu ipsum tincidunt pulvinar. ',
    thumbnails: {
      w160: 'http://placekitten.com/160/164',
    },
    filename: 'http://placekitten.com/2041/1922',
  },
  {
    key: '2',
    title: 'Title 3',
    description:
      'Phasellus imperdiet nunc tincidunt molestie vestibulum. Donec dictum suscipit nibh. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. ',
    thumbnails: {
      w160: 'http://placekitten.com/160/167',
    },
    filename: 'http://placekitten.com/2039/1920',
  },
];

const App = () => {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <FlatList
        data={mediaArray}
        renderItem={({item}) => {
          return (
            <TouchableOpacity style={FlatListStyles.item}>
              <Image
                style={FlatListStyles.image}
                source={{uri: item.thumbnails.w160}}
              />
              <View style={FlatListStyles.textBox}>
                <Text style={FlatListStyles.title}>{item.title}</Text>
                <Text style={FlatListStyles.text}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default App;
