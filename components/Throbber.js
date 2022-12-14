import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

// My Colors
import { colors } from '../styles/MyColors';

const Throbber = ({ size = 'large', color = colors.theme1.aquamarine }) => {
  return (
    <View style={styles.container} >
      <ActivityIndicator size={size} color={color} />
    </View>
  )
};

export default Throbber

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
})