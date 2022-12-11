import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { Modal, View, Text, TouchableHighlight, StyleSheet, TextInput, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { addTaskToFirebaseUser } from '../services/firebase';

const TaskModal = ({ modalVisible, setModalVisible, user }) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date())

  console.log(description)

  const handleSave = () => {
    addTaskToFirebaseUser(user, {
      description: description,
      date: date.toDateString(),
      isDone: false,
    }).then(() => {
      setModalVisible(false);
    }).catch((error) => console.log(error));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Create New Task</Text>
          <TextInput style={styles.input}
            label='description'
            placeholder='Task Description'
            value={description}
            onChangeText={description => setDescription(description)}
          />
          <DatePicker date={date} mode="datetime" onDateChange={setDate} />
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => handleSave()}
            >
              <Text style={styles.textStyle}>Create Task</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  )
}

// TaskModal.propTypes = {
//   modalVisible: PropTypes.bool.isRequired,
//   setModalVisible: PropTypes.func.isRequired,
// }

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    margin: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    marginBottom: 10,
    flexWrap: 'wrap'
  },
});

export default TaskModal;