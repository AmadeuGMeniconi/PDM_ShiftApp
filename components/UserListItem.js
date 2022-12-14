import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

// Components
import Label from "./Label";
import TaskModal from "./TaskModal";

// My Colors
import { colors } from "../colors/MyColors";


const UserListItem = ({ item, renderItem, onPressItem, onPressClose, targetUser, modalVisible, setModalVisible, onPressAddTask }) => {
  return (
    <TouchableOpacity style={styles.userListItem} onPress={() => onPressItem(item)}>

      {targetUser.uid === item.uid &&
        <TouchableOpacity onPress={() => onPressClose({})}>
          <Text style={styles.closeUserButton} >CLOSE</Text>
        </TouchableOpacity>}
      <Text style={styles.userItemUid} >{item.uid}</Text>
      <Label selectable={false} title={'NAME'} value={item.name} />
      <Label selectable={false} title={'EMAIL'} value={item.email} />

      {targetUser.uid === item.uid &&
        <View>
          <FlatList
            data={item.tasks}
            renderItem={renderItem}
          />
          <TouchableOpacity style={styles.addTaskButton} onPress={() => onPressAddTask(true)}>
            <FontAwesomeIcon icon={faPlusCircle} color={colors.theme1.aquamarine} size={40} />
          </TouchableOpacity>
          <TaskModal modalVisible={modalVisible} setModalVisible={setModalVisible} user={targetUser} />
        </View>}

    </TouchableOpacity>
  )

};

const styles = StyleSheet.create({
  userListItem: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    margin: 5,
    elevation: 3
  },
  userItemUid: {
    color: 'white',
    fontWeight: "bold",
    backgroundColor: colors.theme1.aquamarine,
    marginVertical: 10,
    paddingVertical: 5,
    width: '100%',
    borderRadius: 20,
    alignSelf: 'center',
    textAlign: 'center'
  },
  userItemText: {
    margin: 5,
    fontWeight: '700'
  },
  closeUserButton: {
    color: colors.theme1.paradisePink,
    fontSize: 24,
    alignSelf: 'center'
  },
  addTaskButton: {
    alignSelf: 'center',
    marginTop: 15
  },
});

export default UserListItem;

