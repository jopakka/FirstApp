import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Alert} from 'react-native';
import {Card, Button, Input, Image} from 'react-native-elements';
import useUploadForm from '../hooks/UploadHooks';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';

const Modify = ({navigation, route}) => {
  const {file} = route.params;
  const {inputs, handleInputChange, errors, reset, setInputs} = useUploadForm();
  const {update, setUpdate} = useContext(MainContext);
  const [loading, setLoading] = useState(false);
  const {updateFile} = useMedia();

  const doModify = async () => {
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await updateFile(file.file_id, inputs, token);
      console.log('response', response);
      setUpdate(!update);
      clearForm();
      navigation.pop();
    } catch (e) {
      console.error('doModify', e.message);
      Alert.alert('Modify failed');
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    reset();
  };

  useEffect(() => {
    // setInpu
    handleInputChange('title', file.title);
    handleInputChange('description', file.description);
  }, []);

  return (
    <ScrollView>
      <Card>
        <Card.Title h3>Update info</Card.Title>
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
        <Button
          title="Modify"
          onPress={doModify}
          loading={loading}
          disabled={errors.title !== null || errors.description !== null}
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

Modify.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Modify;
