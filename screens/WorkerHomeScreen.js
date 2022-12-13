import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUserTasks } from '../redux/reducers/currentUserSlice';

// Services
import { realTimeFirestoreUser, removeTaskFromFirebaseUser } from '../services/firebase';



const WorkerHomeScreen = () => {

    const dispatch = useDispatch();

    const currentUser = useSelector(store => store.currentUser);

    const [isLoading, setIsLoading] = useState(false);


    const markTaskAsDone = (task) => removeTaskFromFirebaseUser(currentUser, task);

    useEffect(() => {
        realTimeFirestoreUser(currentUser, dispatch, setCurrentUserTasks);
    }, []);


    const taskListItem = ({ item }) => (
        <TouchableOpacity style={styles.taskListItem} >
            <Text style={styles.taskItemDescription}>{item.description}</Text>
            <Text style={styles.taskItemDate}>{item.date}</Text>
            <TouchableOpacity style={styles.doneTaskButton} onPress={() => markTaskAsDone(item)}>
                {item.isDone ? <Text style={styles.doneText}>DONE</Text> : <Text style={styles.markDoneText}>MARK AS DONE</Text>}
            </TouchableOpacity>
        </TouchableOpacity>
    );

    // Render
    return (
        <View style={styles.wrapper} >
            {isLoading ?
                <View>
                    < ActivityIndicator size='large' color='#0F5340' />
                </View >
                :
                <FlatList style={styles.taskList}
                    data={currentUser.tasks}
                    renderItem={taskListItem}
                />}

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
    doneTaskButton: {
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
    markDoneText: {
        color: 'red',
        textAlign: 'center',
        alignSelf: 'center',
    },
    doneText: {
        color: 'green',
        textAlign: 'center',
        alignSelf: 'center',
    },
});

export default WorkerHomeScreen;
