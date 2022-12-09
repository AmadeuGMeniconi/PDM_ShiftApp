import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

// Navigation
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/database';
import { addTasksToUser, addTaskToFirebaseUser, realTimeFirestoreAllWorkerUsers, realTimeFirestoreUser, realTimeFirestoreUserTasks, updateTasksToFirebaseUser } from '../services/firebase';
import { setCurrentUser, setCurrentUserTasks } from '../redux/reducers/currentUserSlice';




const WorkerHomeScreen = () => {

    const navigatior = useNavigation();
    const dispatch = useDispatch();


    const currentUser = useSelector(store => store.currentUser);

    const [taskList, setTaskList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    realTimeFirestoreUser(currentUser)


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
                <Button title='nothing' />}

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

export default WorkerHomeScreen;
