import React from 'react'
import { Modal, View, Text, StyleSheet, Alert } from 'react-native';

// Component
import SimpleButton from './SimpleButton';

// My Colors
import { colors } from '../colors/MyColors';

const ConfirmModal = ({ modalVisible, setModalVisible, onPressConfirm }) => {

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
          <Text style={styles.modalText}>Permanently delete account?</Text>
          <View style={styles.buttonContainer}>
            <SimpleButton title={'DELETE'} elevation={5} onPress={() => setModalVisible(onPressConfirm)} color={colors.theme1.paradisePink} width={100} />
            <SimpleButton title={'CANCEL'} elevation={5} onPress={() => setModalVisible(!modalVisible)} color={colors.theme1.lightAtomicTangerine} width={100} />
          </View>
        </View>
      </View>
    </Modal>
  )
};

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
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'justify',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.theme1.paradisePink
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

export default ConfirmModal;