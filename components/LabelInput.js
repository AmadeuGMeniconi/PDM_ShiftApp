import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'


const LabelInput = ({ label, value, placeholder, setUserName }) => {
  return (
    <View style={styles.labelContainer}>

      <Text style={styles.title}>{label}</Text>
      <TextInput
        style={styles.input}
        label={label}
        placeholder={placeholder}
        value={value}
        onChangeText={text => setUserName(text)}
      />

    </View>
  )
};

export default LabelInput

const styles = StyleSheet.create({
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    flex: 1,
    fontSize: 14,
  },
  input: {
    flex: 4,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: 'white',
  },
})