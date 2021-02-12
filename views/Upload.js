import React, {useContext, useState} from 'react';
import {Platform, ScrollView, StyleSheet, Alert} from 'react-native';
import {Card, Button, Input, Image} from 'react-native-elements';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
import {useMedia, useTag} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {delay} from '../utils/helpers';
import PropTypes from 'prop-types';
import {ActivityIndicator} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import {myAppTag} from '../utils/variables';
import {Video} from 'expo-av';

const Upload = ({navigation}) => {
  const {inputs, handleInputChange, errors, reset} = useUploadForm();
  const {update, setUpdate} = useContext(MainContext);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const {upload} = useMedia();
  const {postTag} = useTag();

  const pickFile = async (library) => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
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
      console.error('pickImage', e.message);
    }

    // console.log('result', result);

    if (!result.cancelled) {
      setFile(result);
      console.log('file', file);
    }
  };

  const doUpload = async () => {
    setLoading(true);

    const filename = file.uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    let type = match ? `${file.type}/${match.pop()}` : file.type;
    if (type === 'image/jpg') type = 'image/jpeg';

    const formData = new FormData();
    formData.append('title', inputs.title);
    formData.append('description', inputs.description);
    formData.append('file', {
      uri: file.uri,
      name: filename,
      type: type,
    });

    try {
      const token = await AsyncStorage.getItem('userToken');
      const uploadResponse = await upload(formData, token);
      // console.log('uploadResponse', uploadResponse);

      if (uploadResponse.file_id !== undefined) {
        const tagResponse = await postTag(
          {file_id: uploadResponse.file_id, tag: myAppTag},
          token
        );
        // console.log('tagResponse', tagResponse);
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
    setFile(null);
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
        {file &&
          (file.type === 'image' ? (
            <Image style={styles.img} source={{uri: file.uri}} />
          ) : (
            <Video
              source={{uri: file.uri}}
              style={styles.img}
              resizeMode="contain"
              useNativeControls
              isLooping
            />
          ))}
        <Card.Divider />
        <Input
          label="Title"
          placeholder="Title (required)"
          value={inputs.title}
          onChangeText={(txt) => handleInputChange('title', txt)}
          errorMessage={errors.title}
        />
        <Input
          label="Description"
          placeholder="Description (required)"
          value={inputs.description}
          onChangeText={(txt) => handleInputChange('description', txt)}
          errorMessage={errors.description}
        />
        <Button title="Select an file" onPress={() => pickFile(true)} />
        <Button title="Take an image" onPress={() => pickFile(false)} />
        {/* {loading && <ActivityIndicator size="large" color="blue" />} */}
        <Button
          title="Upload"
          onPress={doUpload}
          loading={loading}
          disabled={
            errors.title !== null ||
            errors.description !== null ||
            file === null
          }
        />
        <Button
          title="Reset form"
          onPress={() => {
            clearForm();
            console.log('errors', errors.title, errors.description, file);
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
