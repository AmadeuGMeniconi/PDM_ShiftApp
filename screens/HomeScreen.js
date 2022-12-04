import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

// Navigation
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

// Services
import auth from '@react-native-firebase/auth';

// Redux
import { clearCurrentUser } from '../redux/reducers/currentUserSlice';



const HomeScreen = () => {

    const navigatior = useNavigation();
    const dispatch = useDispatch();

    const currentUser = useSelector(store => store.currentUser);

    // const [tasks, setTasks] = useState([]);

    // const renderItem = ({ item }) => (<TaskList description={item.description} date={item.date} />);

    // useEffect(() => {
    //     //retrieve tasks from database
    //     firebase.app().database()
    //         .ref(`users/${currentUser.id}/tasks`)
    //         .once('value', (snapshot) => {
    //             console.log("A escuta de dados foi iniciada");
    //             const data = snapshot.val();
    //             const loadedTasks = [];
    //             for (let key in data) {
    //                 loadedTasks.push(data[key]);
    //             }
    //             setTasks(loadedTasks)
    //         });
    // });

    //Logout user
    const logoutUser = () => {
        auth().signOut().then(() => {
            console.log('User signed out!');
            dispatch(clearCurrentUser());
            navigatior.navigate('Login');
        });
    };

    // Render
    return (
        <View style={styles.wrapper} >
            {currentUser.name ?
                <Text style={styles.label} >Welcome {currentUser.name}</Text>
                :
                <Text style={styles.label} ></Text>
            }
            {/* <FlatList data={tasks}
                renderItem={renderItem}
                keyExtractor={item => item.id} /> */}
            <View style={styles.button}>
                <Button title="Logout" onPress={logoutUser} />
            </View>

        </View>
    );

};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EFEFEF',
        paddingVertical: 80,
        paddingHorizontal: 20,
    },
    container: {
        display: 'flex',
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 32,
        paddingHorizontal: 24,
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        margin: 5
    }
});

export default HomeScreen;
