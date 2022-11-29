import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Throbber = () => {



  // Render
  return (
    <View style={styles.throbberContainer}>
      <ActivityIndicator size={'large'} color={'#fa5600'} />
    </View>
  );
};

const styles = StyleSheet.create({
  throbberContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default Throbber;