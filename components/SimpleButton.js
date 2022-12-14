import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../styles/MyColors';

const SimpleButton = ({ color = colors.theme1.aquamarine, title, onPress, width }) => {
  return (
    <View >
      <TouchableOpacity style={[style.container, { backgroundColor: color, width: width }]} onPress={onPress}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
};

const style = StyleSheet.create({
  container: {
    margin: 5,
    borderRadius: 3,
    padding: 10,
    shadowColor: '#777',
    elevation: 5,
  }
})

export default SimpleButton
