import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

// Navigation
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

// Services
import auth from '@react-native-firebase/auth';

// Redux
import { clearUser } from '../redux/reducers/currentUserSlice';



const HomeScreen = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();


    //Logout user
    const logoutUser = () => {
        auth().signOut().then(() => {
            console.log('User signed out!');
            dispatch(clearUser());
            navigation.navigate('Login');
        });
    };

    // Render
    return (
        <View style={styles.container} >
            <Text style={styles.label} >Welcome</Text>
            <Button style={styles.logout_button} title="Logout" onPress={logoutUser} />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        marginTop: 32,
        paddingHorizontal: 24,
    },
    label: {
        textAlign: 'center',
    }
});

export default HomeScreen;
