import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

// Service
import { realTimeFirestoreAllWorkerUsers, removeTaskFromFirebaseUser } from '../services/firebase';

// Components
import TaskListItem from '../components/TaskListItem';
import Throbber from '../components/Throbber';
import UserListItem from '../components/UserListItem';


const AdminHomeScreen = () => {

    const [userList, setUserList] = useState([]);
    const [targetUser, setTargetUser] = useState({})

    const [modalVisible, setModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        realTimeFirestoreAllWorkerUsers(setUserList, setIsLoading);
    }, []);

    const taskListItem = ({ item }) => (
        <TaskListItem item={item} title={'REMOVE'} user={targetUser} onPressRemove={removeTaskFromFirebaseUser} />
    )

    const userListItem = ({ item }) => (
        <UserListItem
            item={item}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            onPressAddTask={setModalVisible}
            onPressClose={setTargetUser}
            onPressItem={setTargetUser}
            renderItem={taskListItem}
            targetUser={targetUser} />
    )


    // Render
    return (
        <View style={styles.wrapper} >

            {isLoading &&
                <Throbber />}

            {!isLoading &&
                <View >
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
});

export default AdminHomeScreen;
