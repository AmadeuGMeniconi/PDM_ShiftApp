import { StyleSheet, Text, TouchableOpacity } from "react-native";

// My Colors
import { colors } from "../styles/MyColors";

const TaskListItem = ({ user, item, onPressRemove, title }) => {
  return (
    <TouchableOpacity style={styles.taskListItem} >
      <Text style={styles.taskItemDescription}>{item.description}</Text>
      <Text style={styles.taskItemDate}>{item.date}</Text>
      <TouchableOpacity style={styles.doneTaskButton} onPress={() => onPressRemove(user, item)}>
        <Text style={styles.markDoneText}>{title}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )

};

const styles = StyleSheet.create({
  taskListItem: {
    backgroundColor: colors.theme1.aquamarine,
    borderRadius: 20,
    padding: 15,
    margin: 5,
    elevation: 5
  },
  taskItemDescription: {
    color: 'white',
    fontWeight: '400',
    margin: 5
  },
  taskItemDate: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    margin: 5
  },
  doneTaskButton: {
    color: colors.theme1.paradisePink,
    backgroundColor: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    padding: 5,
    margin: 5,
    borderRadius: 5,
    elevation: 5,
    width: '100%'
  },
  markDoneText: {
    color: colors.theme1.paradisePink,
    textAlign: 'center',
    alignSelf: 'center',
  },
  doneText: {
    color: colors.theme1.aquamarine,
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default TaskListItem;

