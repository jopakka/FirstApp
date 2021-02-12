import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Avatar, ListItem as RNEListItem} from 'react-native-elements';
import {StyleSheet, Text} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {Alert} from 'react-native';

const ListItem = ({navigation, singleMedia, isMyFile}) => {
  const {deleteFile} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const delFile = () => {
    Alert.alert('Are you sure?', 'Do you really want to delete this file?', [
      {text: 'Cancel'},
      {
        text: 'Delete',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await deleteFile(singleMedia.file_id, token);
            setUpdate(!update);
            console.log('delFile', response);
          } catch (e) {
            console.error('delFile', e.message);
          }
        },
      },
    ]);
  };

  return (
    <RNEListItem
      bottomDivider
      onPress={() => navigation.navigate('Single', {media: singleMedia})}
    >
      <Avatar
        source={{uri: uploadsUrl + singleMedia.thumbnails.w160}}
        style={styles.avatar}
      />
      <RNEListItem.Content>
        <RNEListItem.Title>{singleMedia.title}</RNEListItem.Title>
        <RNEListItem.Subtitle>{singleMedia.description}</RNEListItem.Subtitle>
        {isMyFile && (
          <>
            <RNEListItem.ButtonGroup
              buttons={[
                <Text
                  onPress={() => navigation.push('Modify', {file: singleMedia})}
                >
                  Modify
                </Text>,
                <Text onPress={() => delFile()} style={{color: 'red'}}>
                  Delete
                </Text>,
              ]}
              containerStyle={{marginTop: 10}}
            />
          </>
        )}
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
  delete: {
    backgroundColor: 'red',
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  isMyFile: PropTypes.bool,
};

export default ListItem;
