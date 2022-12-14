import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUserTasks } from '../redux/reducers/currentUserSlice';

// Components
import TaskListItem from '../components/TaskListItem';
import Throbber from '../components/Throbber';

// Services
import { realTimeFirestoreUser, removeTaskFromFirebaseUser } from '../services/firebase';
import { colors } from '../styles/MyColors';


const WorkerHomeScreen = () => {

    const dispatch = useDispatch();

    const currentUser = useSelector(store => store.currentUser);

    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        realTimeFirestoreUser(currentUser, dispatch, setCurrentUserTasks);
    }, []);


    const taskListItem = ({ item }) => (
        <TaskListItem item={item} title={'DONE'} onPressRemove={removeTaskFromFirebaseUser} user={currentUser} />
    );

    // Render
    return (
        <View style={styles.wrapper} >

            {isLoading ?
                <Throbber />
                :
                <FlatList
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
        backgroundColor: colors.theme1.lightGray,
        paddingVertical: 20,
        paddingBottom: 70,
        paddingHorizontal: 20,
    },
});

export default WorkerHomeScreen;
