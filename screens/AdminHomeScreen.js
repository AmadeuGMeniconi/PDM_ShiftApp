import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Navigation
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/database';
import { addTasksToUser, addTaskToFirebaseUser, realTimeFirestoreAllWorkerUsers, realTimeFirestoreUser, realTimeFirestoreUserTasks, updateTasksToFirebaseUser } from '../services/firebase';
import { setCurrentUser, setCurrentUserTasks } from '../redux/reducers/currentUserSlice';




const AdminHomeScreen = () => {

    const navigatior = useNavigation();
    const dispatch = useDispatch();

    const currentUser = useSelector(store => store.currentUser);

    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [task, setTask] = useState({ date: '01/01/01', description: 'sjsjs', isDone: false, title: 'task2' })


    const pushUserToList = async (user) => {

        if (!userList.includes(user)) {
            let list = userList
            list.push(user)
            console.log('User: ', user)

            setUserList(list)
            console.log('UserList: ', userList)
        }

    }

    const addTask = (user) => {
        setIsLoading(true)
        addTaskToFirebaseUser(user, task).then(() => {
            setIsLoading(false)
        })
    }

    const userCardItem = ({ item }) => (
        <TouchableOpacity >
            <Text>{item.uid}</Text>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
            <Text>{item.role}</Text>
        </TouchableOpacity>
    )

    realTimeFirestoreAllWorkerUsers(pushUserToList, setIsLoading)



    // Render
    return (
        <View style={styles.wrapper} >

            {isLoading ?
                <View>
                    < ActivityIndicator
                        size='large'
                        color='#0F5340'
                    />
                </View >
                :
                <View>
                    <FlatList
                        data={userList}
                        renderItem={userCardItem}
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
        paddingBottom: 70,
        paddingHorizontal: 20,
    },
    label: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    },
});

export default AdminHomeScreen;
