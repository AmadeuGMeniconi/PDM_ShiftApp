import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Services
import auth from '@react-native-firebase/auth';

// Redux
import { changeCurrentUserName, clearCurrentUser } from '../redux/reducers/currentUserSlice';
import { useDispatch, useSelector } from 'react-redux';

// Component
import Label from '../components/Label';
import { deleteAuthUser, updateFirestoreUserName } from '../services/firebase';


const ProfileScreen = () => {

    const dispatch = useDispatch();
    const navigator = useNavigation();

    const currentUser = useSelector(store => store.currentUser);

    const [userName, setUserName] = useState('');
    const [isEditName, setIsEditName] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setUserName('')
    }, [currentUser.name]);

    const updateUserName = (value) => {
        setIsEditName(false);
        setIsLoading(true);
        dispatch(changeCurrentUserName(value));
        updateFirestoreUserName(currentUser, value)
            .then(() => setIsLoading(false));
    };

    const logOutUser = () => {
        auth().signOut().then(() => {
            console.log('User signed out!');
            navigator.navigate('Login');
            dispatch(clearCurrentUser());
        });
    };

    const deleteUser = () => {
        deleteAuthUser().then(() => {
            navigator.navigate('Login');
        })
    };

    // Render
    return (
        <View style={styles.wrapper}>

            {!isEditName ?
                <View>
                    <View style={styles.formContainer}>
                        <Label value={currentUser.uid} title='UID' />
                        <Label value={currentUser.role} title='ROLE' />
                        <Label value={currentUser.name} title='USERNAME' />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button title="Change Name" onPress={() => setIsEditName(true)} />
                    </View>
                </View>
                :
                <View >
                    <View >
                        <Label value={currentUser.uid} title='UID' />
                        <Label value={currentUser.role} title='ROLE' />
                        <Text style={styles.title}>USERNAME</Text>
                        <TextInput
                            style={styles.input}
                            label="Username"
                            placeholder="Choose username"
                            value={userName}
                            onChangeText={userName => setUserName(userName)}
                        />
                        <View style={styles.buttonContainer} >
                            <Button title="Confirm" onPress={() => updateUserName(userName)} />
                        </View>
                        <View style={styles.buttonContainer} >
                            <Button title="Cancel" onPress={() => setIsEditName(false)} />
                        </View>
                    </View>
                </View>}

            <View style={styles.logOutButtonContainer}>

                {isLoading ?
                    <>
                        <ActivityIndicator size='large' color='#0F5340' />
                    </>
                    :
                    <>
                        <TouchableOpacity style={styles.logOutButton} onPress={logOutUser}>
                            <Text style={styles.buttonText} >LOGOUT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteButton} onPress={deleteUser}>
                            <Text style={styles.buttonText} >DELETE</Text>
                        </TouchableOpacity>
                    </>}

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFEFEF',
        paddingVertical: 80,
        paddingHorizontal: 20,
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 32,
    },
    input: {
        textAlign: 'center',
        height: 40,
        borderRadius: 30,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    title: {
        alignSelf: 'center',
        fontSize: 16,
        margin: 5
    },
    buttonContainer: {
        margin: 5,
    },
    logOutButtonContainer: {
        marginVertical: 40
    },
    logOutButton: {
        backgroundColor: '#3399ff',
        textAlign: 'center',
        marginBottom: 20,
        borderRadius: 5,
        elevation: 3
    },
    deleteButton: {
        backgroundColor: '#ff4444',
        textAlign: 'center',
        borderRadius: 5,
        elevation: 3
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        padding: 10
    }

});

export default ProfileScreen;
