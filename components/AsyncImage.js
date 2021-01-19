import React, {useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

const AsyncImage = ({style, source, indicatorColor}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = () => setIsLoaded(true);

  return (
    <View style={style}>
      <Image source={source} style={style} onLoad={onLoad} />
      {!isLoaded && (
        <ActivityIndicator
          size="large"
          color={indicatorColor || 'white'}
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

AsyncImage.propTypes = {
  style: PropTypes.object,
  source: PropTypes.object.isRequired,
  indicatorColor: PropTypes.string,
};

export default AsyncImage;
