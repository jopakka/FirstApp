import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import FlatListStyles from '../styles/FlatListStyles';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {
  Avatar,
  Button,
  Image,
  ListItem as RNEListItem,
} from 'react-native-elements';
import {StyleSheet} from 'react-native';

const ListItem = ({singleMedia, navigation}) => {
  return (
    <RNEListItem
      bottomDivider
      onPress={() => {
        console.log('xD');
        navigation.navigate('Single', {media: singleMedia});
      }}
    >
      <Avatar
        source={{uri: uploadsUrl + singleMedia.thumbnails.w160}}
        style={styles.avatar}
      />
      <RNEListItem.Content>
        <RNEListItem.Title>{singleMedia.title}</RNEListItem.Title>
        <RNEListItem.Subtitle>{singleMedia.description}</RNEListItem.Subtitle>
      </RNEListItem.Content>
      <RNEListItem.Chevron size={30} />
    </RNEListItem>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 75,
    height: 75,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default ListItem;
