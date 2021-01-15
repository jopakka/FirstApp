import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ListItem from './ListItem';

const url = 'http://media.mw.metropolia.fi/wbma/';

const List = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    try {
      const response = await fetch(url + 'media');
      const json = await response.json();
      const media = await loadMediaInfo(json);
      console.log('media', media);
      setMediaArray(media);
    } catch (e) {
      console.error('List loadMedia', e.message);
    }
  };

  const loadMediaInfo = async (array) => {
    return await Promise.all(
      array.map(async (item) => {
        try {
          const response = await fetch(url + 'media/' + item.file_id);
          const json = await response.json();
          return json;
        } catch (e) {
          console.error('List loadThumb', e.message);
        }
      })
    );
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return (
    <FlatList
      style={styles.list}
      data={mediaArray}
      keyExtractor={(_item, index) => index.toString()}
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
