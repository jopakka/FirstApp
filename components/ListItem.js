import React, {useState} from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  Modal,
  StyleSheet,
  Button,
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
        style={styles.modal}
        visible={modalVis}
        transparent={true}
        onRequestClose={() => setModalVis(false)}
      >
        <TouchableOpacity
          style={styles.modalTouch}
          onPress={() => setModalVis(false)}
        >
          <Image
            style={styles.modalImage}
            source={{uri: singleMedia.filename}}
            onPress={() => setModalVis(false)}
          />
        </TouchableOpacity>
      </Modal>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
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
