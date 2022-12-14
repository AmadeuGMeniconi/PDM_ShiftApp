import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


const Label = ({ value, title, selectable }) => {
  return (
    <View style={styles.labelContainer}>

      <Text style={styles.title}>{title}</Text>
      <Text selectable={selectable} style={styles.label}>{value}</Text>

    </View>
  )
};

export default Label

const styles = StyleSheet.create({
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  title: {
    flex: 1,
    fontSize: 14,
  },
  label: {
    flex: 4,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: 'white',
  },
})