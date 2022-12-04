import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';

// Navigation
import { NavigationContainer, useNavigation } from '@react-navigation/native';

// Services
import { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

// Redux
import { changeCurrentUserName, clearCurrentUser } from '../redux/reducers/currentUserSlice';
import { useDispatch, useSelector } from 'react-redux';

// Component
import Label from '../components/Label';


const ProfileScreen = () => {

    const dispatch = useDispatch();
    const navigator = useNavigation();

    const currentUser = useSelector(store => store.currentUser);

    const [userName, setUserName] = useState('');
    const [isEditName, setIsEditName] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setUserName('')
    }, [currentUser.name])

    const updateUserName = (value) => {
        setIsEditName(false);
        setIsLoading(true);
        dispatch(changeCurrentUserName(value));
        firebase.app().database()
            .ref(`/users/${currentUser.id}/name`)
            .set(value)
            .then(() => {
                setIsLoading(false);
                ToastAndroid.show('Username updated', ToastAndroid.SHORT);
            })
    };

    const logOutUser = () => {
        auth().signOut().then(() => {
            console.log('User signed out!');
            dispatch(clearCurrentUser());
            navigator.navigate('Login');
        });
    };

    const deleteUser = () => {
        setIsLoading(true);
        firebase.app().database()
            .ref(`/users/${currentUser.id}`)
            .remove()
            .then(() => {
                ToastAndroid.show('User data removed', ToastAndroid.SHORT);
                auth().currentUser.delete().then(() => {
                    dispatch(clearCurrentUser());
                    ToastAndroid.show('User deleted', ToastAndroid.SHORT)
                    navigator.navigate('Login');
                    setIsLoading(false);
                });
            })
    };

    // Render
    return (
        <View style={styles.wrapper}>

            {!isEditName ?
                <View>
                    <View style={styles.formContainer}>
                        <Label value={currentUser.id} title='UID' />
                        <Label value={currentUser.role} title='ROLE' />
                        <Label value={currentUser.name} title='USERNAME' />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button title="Change Name" onPress={() => setIsEditName(true)} />
                    </View>


                </View>
                :
                <View >
                    <View style={styles.formContainer}>
                        <Label value={currentUser.id} title='UID' />
                        <Label value={currentUser.role} title='ROLE' />
                        <Text style={styles.title}>USERNAME</Text>
                        <TextInput
                            style={styles.input}
                            label="Username"
                            placeholder="Choose username"
                            value={userName}
                            onChangeText={userName => setUserName(userName)}
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Confirm" onPress={() => updateUserName(userName)} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title="Cancel" onPress={() => setIsEditName(false)} />
                        </View>

                    </View>
                </View>}
            <View style={styles.logOutButtonContainer}>
                {isLoading ?
                    <View >
                        <ActivityIndicator
                            size='large'
                            color='#0F5340'
                        />
                    </View>
                    :
                    <View style={styles.buttonContainer}>
                        <Button title="Delete user" onPress={deleteUser} />
                    </View>}
                <View style={styles.buttonContainer}>
                    <Button title="Logout" onPress={logOutUser} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flex: 1,
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
        marginBottom: 45,
        backgroundColor: 'white',
    },
    title: {
        alignSelf: 'center',
        fontSize: 16,
        margin: 5
    },
    buttonContainer: {
        marginTop: 20,
    },
    logOutButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',

    }

});

export default ProfileScreen;
