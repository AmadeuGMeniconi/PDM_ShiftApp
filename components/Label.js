import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Label = ({ value, title }) => {
  return (
    <View style={styles.labelContainer}>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.label}>{value}</Text>

    </View>
  )
};

export default Label

const styles = StyleSheet.create({
  labelContainer: {
    alignContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    margin: 5
  },
  label: {
    textAlign: 'center',
    marginBottom: 10,
    width: 350,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },
})