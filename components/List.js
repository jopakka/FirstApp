import React, {useContext} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ListItem from './ListItem';
import {useLoadMedia} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';

const List = ({navigation, myFilesOnly = false}) => {
  const {user} = useContext(MainContext);
  const {mediaArray} = useLoadMedia(myFilesOnly, user.user_id);

  return (
    <FlatList
      style={styles.list}
      data={mediaArray}
      keyExtractor={(_item, index) => index.toString()}
      renderItem={({item}) => (
        <ListItem
          singleMedia={item}
          navigation={navigation}
          isMyFile={item.user_id === user.user_id}
        />
      )}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object.isRequired,
  myFilesOnly: PropTypes.bool,
};

const styles = StyleSheet.create({
  list: {
    padding: 8,
  },
});

export default List;
