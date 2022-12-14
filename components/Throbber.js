import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

// My Colors
import { colors } from '../colors/MyColors';


const Throbber = ({ size = 'large', color = colors.theme1.aquamarine }) => {
  return (
    <View style={styles.container} >
      <ActivityIndicator size={size} color={color} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});

export default Throbber;