import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

// Navigation
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/database';




const HomeScreen = () => {

    const navigatior = useNavigation();
    const dispatch = useDispatch();

    const currentUser = useSelector(store => store.currentUser);

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState()
    const [isAdmin, setIsAdmin] = useState(false);
    const [targetUserUid, setTargetUserUid] = useState('');

    useEffect(() => {
        if (currentUser.role === 'ADMIN') {
            setIsAdmin(true)
        } else {
            firebase.app().database()
                .ref(`users/${currentUser.id}/tasks`)
                .once('value', (snapshot) => {
                    console.log("A escuta de dados foi iniciada");
                    const data = snapshot.val();
                    const loadedTasks = [];
                    for (let key in data) {
                        loadedTasks.push(data[key]);
                    }
                    setTasks(loadedTasks)
                });
        }
    }, []);

    // const renderItem = ({ item }) => (<TaskList description={item.description} date={item.date} />);

    // Render
    return (
        <View style={styles.wrapper} >
            {currentUser.name ?
                <Text style={styles.label} >Welcome {currentUser.name}</Text>
                :
                <Text style={styles.label} >Welcome</Text>}

            {isAdmin ?
                <View style={styles.container}>
                    <FlatList />
                    <View style={styles.buttonContainer}>
                        <Button title="Add tasks" />
                    </View>
                    <TextInput
                        style={styles.input}
                        label="Target user UID"
                        placeholder="Paste target user UID here"
                        value={targetUserUid}
                        onChangeText={targetUserUid => setTargetUserUid(targetUserUid)}
                    />
                    <View >
                        <Button title="Submit" />
                    </View>
                </View>
                :
                <>
                    <FlatList />
                </>
            }

            {/* <FlatList data={tasks}
                renderItem={renderItem}
                keyExtractor={item => item.id} /> */}



        </View>
    );

};

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
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        marginTop: 32,
    },
    buttonContainer: {
        width: 100,
        alignSelf: 'center',
        marginVertical: 20

    },
    input: {
        textAlign: 'center',
        height: 40,
        borderRadius: 30,
        marginVertical: 10,
        backgroundColor: 'white',
    },

});

export default HomeScreen;
