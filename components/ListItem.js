import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import FlatListStyles from '../styles/FlatListStyles';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import AsyncImage from './AsyncImage';

const ListItem = ({singleMedia, navigation}) => {
  return (
    <TouchableOpacity
      style={FlatListStyles.item}
      onPress={() => navigation.navigate('Single', {media: singleMedia})}
    >
      <AsyncImage
        style={FlatListStyles.image}
        source={{uri: uploadsUrl + singleMedia.thumbnails.w160}}
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

export default ListItem;
