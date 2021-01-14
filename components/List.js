import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ListItem from './ListItem';

const List = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const url =
    'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';
  const loadMedia = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setMediaArray(json);
    } catch (e) {
      console.error('List loadMedia', e.message);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return (
    <FlatList
      style={styles.list}
      data={mediaArray}
      keyExtractor={(_key, index) => index.toString()}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 8,
  },
});

export default List;
