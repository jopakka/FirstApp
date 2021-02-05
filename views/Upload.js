import React, {useContext, useState} from 'react';
import {Platform, ScrollView, StyleSheet, Alert} from 'react-native';
import {Card, Button, Input, Image} from 'react-native-elements';
import useUploadForm from '../hooks/UploadHooks';
import {validator, constraints} from '../utils/validator';
import * as ImagePicker from 'expo-image-picker';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {delay} from '../utils/helpers';
import PropTypes from 'prop-types';
import {ActivityIndicator} from 'react-native';
import {MainContext} from '../contexts/MainContext';

const Upload = ({navigation}) => {
  const {inputs, handleInputChange, errors, reset} = useUploadForm();
  const {update, setUpdate} = useContext(MainContext);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const {upload} = useMedia();

  const pickImage = async (library) => {
    const options = {
      allowsEditing: true,
      quality: 1,
    };

    let result = null;

    try {
      if (library) {
        const perm = await askMedia();
        if (!perm) return;
        result = await ImagePicker.launchImageLibraryAsync(options);
      } else {
        const perm = await askCamera();
        if (!perm) return;
        result = await ImagePicker.launchCameraAsync(options);
      }
    } catch (e) {
      console.log('pickImage', e.message);
    }

    console.log('result', result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const doUpload = async () => {
    setLoading(true);
    checkTitle();

    const filename = image.uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    let type = match ? `${image.type}/${match.pop()}` : image.type;
    if (type === 'image/jpg') type = 'image/jpeg';

    const formData = new FormData();
    formData.append('title', inputs.title);
    formData.append('description', inputs.description);
    formData.append('file', {
      uri: image.uri,
      name: filename,
      type: type,
    });

    try {
      const token = await AsyncStorage.getItem('userToken');
      const res = await upload(formData, token);
      console.log('doUpload', res);

      if (res.file_id !== undefined) {
        await delay(1500);
        clearForm();
        setUpdate(!update);
        navigation.navigate('Home');
      }
    } catch (e) {
      console.error('doUpload', e.message);
      Alert.alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setImage(null);
    reset();
  };

  const askCamera = async () => {
    if (Platform.OS !== 'web') {
      const {status} = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera permissons to make this work!');
        return false;
      }
    }
    return true;
  };

  const askMedia = async () => {
    if (Platform.OS !== 'web') {
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissons to make this work!');
        return false;
      }
    }
    return true;
  };

  return (
    <ScrollView>
      <Card>
        <Card.Title h3>Upload an image</Card.Title>
        <Image
          style={styles.img}
          source={{uri: image ? image.uri : 'http://placekitten.com/400'}}
        />
        <Card.Divider />
        <Input
          label="Title"
          placeholder="Title (required)"
          value={inputs.title}
          onChangeText={(txt) => {
            handleInputChange('title', txt);
          }}
          errorMessage={errors.title}
        />
        <Input
          label="Description"
          placeholder="Description (optional)"
          value={inputs.description}
          onChangeText={(txt) => handleInputChange('description', txt)}
          errorMessage={errors.description}
        />
        <Button title="Select an image" onPress={() => pickImage(true)} />
        <Button title="Take an image" onPress={() => pickImage(false)} />
        {loading && <ActivityIndicator size="large" color="blue" />}
        <Button
          title="Upload"
          onPress={doUpload}
          disabled={
            errors.title !== null ||
            errors.description !== null ||
            image === null
          }
        />
        <Button
          title="Reset form"
          onPress={() => {
            clearForm();
            console.log('errors', errors.title, errors.description, image);
          }}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  img: {
    height: undefined,
    aspectRatio: 4 / 3,
  },
});

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
