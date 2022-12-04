import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

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
                <Text style={styles.label} >Welcome User</Text>}
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
        textAlign: 'center',
    },
    button: {
        margin: 5
    }
});

export default HomeScreen;
