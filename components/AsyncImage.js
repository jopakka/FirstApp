import React, {useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';

const AsyncImage = ({style, source}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = () => setIsLoaded(true);

  return (
    <View style={style}>
      <Image
        source={source}
        style={[style, styles.indicator]}
        onLoad={onLoad}
      />
      {!isLoaded && (
        <ActivityIndicator
          size="large"
          color="white"
          style={[style, styles.indicator]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
  },
});

export default AsyncImage;
