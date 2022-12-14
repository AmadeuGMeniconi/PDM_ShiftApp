import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

// My Colors
import { colors } from '../colors/MyColors';


const SimpleButton = ({ elevation, textColor = 'white', color = colors.theme1.aquamarine, title, onPress, width }) => {
  return (
    <View >
      <TouchableOpacity style={[style.container, { backgroundColor: color, width: width, elevation: elevation }]} onPress={onPress}>
        <Text style={{ color: textColor, textAlign: 'center', fontWeight: 'bold' }}>{title}</Text>
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
  }
});

export default SimpleButton;
