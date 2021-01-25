import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ListItem from './ListItem';
import {useLoadMedia} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';

const List = ({navigation}) => {
  const {mediaArray} = useLoadMedia();

  return (
    <FlatList
      style={styles.list}
      data={mediaArray}
      keyExtractor={(_item, index) => index.toString()}
      renderItem={({item}) => (
        <ListItem singleMedia={item} navigation={navigation} />
      )}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  list: {
    padding: 8,
  },
});

export default List;
