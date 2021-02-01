import React, {useState} from 'react';
import {Platform, ScrollView, StyleSheet} from 'react-native';
import {Card, Button, Input, Image} from 'react-native-elements';
import useUploadForm from '../hooks/UploadHooks';
import {validator, constraints} from '../utils/validator';
import * as ImagePicker from 'expo-image-picker';
import {Alert} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Upload = () => {
  const {inputs, handleInputChange} = useUploadForm();
  const [titleStatus, setTitleStatus] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const {upload} = useMedia();

  const checkTitle = () => {
    const errors = validator('title', inputs.title, constraints);
    setTitleStatus(errors);
  };

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

    if (!image) {
      Alert.alert('Image missing');
      setLoading(false);
      return;
    } else if (titleStatus) {
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', inputs.title);
    formData.append('description', inputs.description);
    formData.append('file', {
      uri: image.uri,
      name: 'filename',
      type: 'image/jpeg',
    });

    try {
      const token = await AsyncStorage.getItem('userToken');
      const res = await upload(formData, token);
      console.log('doUpload', res);
    } catch (e) {
      // console.error('doUpload', e.message);
    }

    setLoading(false);
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
          onChangeText={(txt) => handleInputChange('title', txt)}
          onEndEditing={() => checkTitle()}
          errorMessage={titleStatus}
        />
        <Input
          label="Description"
          placeholder="Description (optional)"
          onChangeText={(txt) => handleInputChange('description', txt)}
        />
        <Button title="Select an image" onPress={() => pickImage(true)} />
        <Button title="Take an image" onPress={() => pickImage(false)} />
        <Button title="Upload" onPress={doUpload} loading={loading} />
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

export default Upload;
