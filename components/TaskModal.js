import React, { useState } from 'react'
import { Modal, View, Text, StyleSheet, TextInput, Alert } from 'react-native';

// Date Picker
import DatePicker from 'react-native-date-picker'
import { colors } from '../colors/MyColors';

// Services
import { addTaskToFirebaseUser } from '../services/firebase';

// Component
import SimpleButton from './SimpleButton';


const TaskModal = ({ modalVisible, setModalVisible, user }) => {

  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSave = () => {
    addTaskToFirebaseUser(user, {
      description: description,
      date: date.toISOString(),
      isDone: false
    }).then(() => {
      setDescription('');
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
            onChangeText={text => setDescription(text)}
          />
          <DatePicker date={date} mode="date" onDateChange={setDate} />
          <View style={styles.buttonContainer}>
            <SimpleButton elevation={5} onPress={() => handleSave()} title={'CREATE'} />
            <SimpleButton elevation={5} onPress={() => setModalVisible(!modalVisible)} title={'CANCEL'} color={colors.theme1.lightAtomicTangerine} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    marginVertical: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 10
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  input: {
    marginBottom: 10,
    flexWrap: 'wrap'
  },
});

export default TaskModal;