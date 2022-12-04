import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';

// Navigation
import { useDispatch, useSelector } from 'react-redux';

// Services
import { firebase } from '@react-native-firebase/database';

// Redux
import { changeCurrentUserName } from '../redux/reducers/currentUserSlice';


const ProfileScreen = () => {

    const dispatch = useDispatch();

    const currentUser = useSelector(store => store.currentUser);

    const [userName, setUserName] = useState('');

    useEffect(() => {
        setUserName('')
    }, [currentUser.name])

    const changeUserName = (value) => {
        dispatch(changeCurrentUserName(value));
        firebase.app().database()
            .ref(`/users/${currentUser.id}/name`)
            .set(value)
            .then(() => {
                ToastAndroid.show('Username updated', ToastAndroid.SHORT);
            })
    }

    // Render
    return (
        <View style={styles.wrapper}>

            {currentUser.name ?
                <View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>UID</Text>
                        <Text style={[styles.label,
                        {
                            backgroundColor: 'white',
                            padding: 10,
                            borderRadius: 20,
                            fontWeight: 'bold'
                        }]}>{currentUser.id}</Text>
                        <Text style={styles.label}>USER NAME</Text>
                        <Text style={[styles.label,
                        {
                            backgroundColor: 'white',
                            padding: 10,
                            borderRadius: 20,
                            fontWeight: 'bold'
                        }]}>{currentUser.name}</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.input}
                            label="Username"
                            placeholder="Change user name"
                            value={userName}
                            onChangeText={userName => setUserName(userName)}
                        />
                        <View style={styles.button}>
                            <Button
                                title="Confirm"
                                onPress={() => changeUserName(userName)}
                            />
                        </View>
                    </View>
                </View>
                :
                <View >
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Choose a user name</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.input}
                            label="Username"
                            placeholder="Please add a username"
                            value={userName}
                            onChangeText={userName => setUserName(userName)}
                        />
                        <View style={styles.button}>
                            <Button
                                title="Confirm"
                                onPress={() => changeUserName(userName)}
                            />
                        </View>
                    </View>
                </View>}
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
    labelContainer: {
        alignContent: 'center',

    },
    label: {
        textAlign: 'center',
        fontSize: 18,
        marginVertical: 2
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
    },

    input: {
        width: 200,
        borderRadius: 5,
        margin: 5,
        backgroundColor: 'white',
    },
    buttonContainer: {
        margin: 20,
    },
    button: {
        backgroundColor: 'red',
        margin: 5,
    },

});

export default ProfileScreen;
