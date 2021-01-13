import React, {useState} from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import FlatListStyles from '../styles/FlatListStyles';
import PropTypes from 'prop-types';

const ListItem = ({singleMedia}) => {
  const [modalVis, setModalVis] = useState(false);

  return (
    <TouchableOpacity
      style={FlatListStyles.item}
      onPress={() => setModalVis(true)}
    >
      <Image
        style={FlatListStyles.image}
        source={{uri: singleMedia.thumbnails.w160}}
      />
      <View style={FlatListStyles.textBox}>
        <Text style={FlatListStyles.title}>{singleMedia.title}</Text>
        <Text style={FlatListStyles.text}>{singleMedia.description}</Text>
      </View>
      <Modal
        visible={modalVis}
        transparent={true}
        onRequestClose={() => setModalVis(false)}
      >
        <Image
          style={styles.modalImage}
          source={{uri: singleMedia.filename}}
          onPress={() => Alert.alert('image pressed')}
        />
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'blue',
  },
  modalImage: {
    width: '100%',
    height: 400,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
};

export default ListItem;
