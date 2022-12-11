import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Navigation
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { realTimeFirestoreAllWorkerUsers, removeTaskFromFirebaseUser } from '../services/firebase';
import { setCurrentUser, setCurrentUserTasks } from '../redux/reducers/currentUserSlice';
import TaskModal from '../components/TaskModal';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'


const AdminHomeScreen = () => {

    const navigatior = useNavigation();

    const currentUser = useSelector(store => store.currentUser);

    const [userList, setUserList] = useState([]);
    const [targetUser, setTargetUser] = useState({})

    const [modalVisible, setModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    console.log(targetUser)

    const taskListItem = ({ item }) => (
        <TouchableOpacity style={styles.taskListItem} >
            <Text style={styles.taskItemDescription}>{item.description}</Text>
            <Text style={styles.taskItemDate}>{item.date}</Text>
            <TouchableOpacity onPress={() => removeTaskFromFirebaseUser(targetUser, item)}>
                <Text style={styles.deleteTaskButton}>DELETE</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )

    const userListItem = ({ item }) => (
        <TouchableOpacity style={styles.userListItem} onPress={() => setTargetUser(item)}>
            {targetUser.uid === item.uid &&
                <TouchableOpacity onPress={() => setTargetUser({})}>
                    <Text style={styles.closeUserButton} >CLOSE</Text>
                </TouchableOpacity>}
            <Text style={styles.userItemUid} >{item.uid}</Text>
            <Text style={styles.userItemText} >NAME: {item.name}</Text>
            <Text style={styles.userItemText} >EMAIL: {item.email}</Text>
            {targetUser.uid === item.uid &&
                <View>
                    <FlatList style={styles.taskList}
                        data={item.tasks}
                        renderItem={taskListItem}
                    />
                    <TouchableOpacity style={styles.addTaskButton} onPress={() => setModalVisible(true)}>
                        <FontAwesomeIcon icon={faPlusCircle} color={'#4477ff'} size={40} />
                    </TouchableOpacity>
                    <TaskModal modalVisible={modalVisible} setModalVisible={setModalVisible} user={targetUser} />
                </View>}
        </TouchableOpacity>
    )

    realTimeFirestoreAllWorkerUsers(setUserList, setIsLoading)

    // Render
    return (
        <View style={styles.wrapper} >

            {isLoading &&
                < ActivityIndicator
                    style={styles.loading}
                    size='large'
                    color='#4477ff'
                />}

            {!isLoading &&
                <View style={styles.userList}>
                    <FlatList
                        data={userList}
                        renderItem={userListItem}
                        keyExtractor={item => item.uid}
                    />
                </View>}

        </View>
    );
}


const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#EFEFEF',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    loading: {
        flex: 1,

    },
    userListItem: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 15,
        margin: 5,
        elevation: 5
    },
    userItemUid: {
        color: 'white',
        backgroundColor: '#a0a0a0',
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
    taskList: {
        marginVertical: 10
    },
    taskListItem: {
        backgroundColor: '#4477ff',
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
    closeUserButton: {
        color: '#4477ff',
        fontSize: 24,
        alignSelf: 'center'
    },
    deleteTaskButton: {
        color: 'red',
        backgroundColor: 'white',
        textAlign: 'center',
        alignSelf: 'center',
        padding: 5,
        margin: 5,
        borderRadius: 5,
        elevation: 5,
        width: '100%'
    },
    addTaskButton: {
        alignSelf: 'center',
        margin: 5
    },
});

export default AdminHomeScreen;
