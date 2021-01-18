import React from 'react';
import {TouchableOpacity, Image, View, Text, StyleSheet} from 'react-native';
import FlatListStyles from '../styles/FlatListStyles';
import PropTypes from 'prop-types';

const url = 'http://media.mw.metropolia.fi/wbma/';

const ListItem = ({singleMedia, navigation}) => {
  return (
    <TouchableOpacity
      style={FlatListStyles.item}
      onPress={() => navigation.navigate('Single')}
    >
      <Image
        style={FlatListStyles.image}
        source={{uri: url + 'uploads/' + singleMedia.thumbnails.w160}}
      />
      <View style={FlatListStyles.textBox}>
        <Text style={FlatListStyles.title}>{singleMedia.title}</Text>
        <Text style={FlatListStyles.text}>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#000000AA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTouch: {
    height: '100%',
    backgroundColor: '#000000AA',
    justifyContent: 'center',
  },
  modalImage: {
    height: 300,
  },
});

export default ListItem;
