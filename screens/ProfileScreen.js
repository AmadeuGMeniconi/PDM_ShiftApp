import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';

// Navigation
import { useDispatch, useSelector } from 'react-redux';

// Services
import { firebase } from '@react-native-firebase/database';

// Redux
import { changeCurrentUserName } from '../redux/reducers/currentUserSlice';

// Component
import Label from '../components/Label';


const ProfileScreen = () => {

    const dispatch = useDispatch();

    const currentUser = useSelector(store => store.currentUser);

    const [userName, setUserName] = useState('');
    const [isEditName, setIsEditName] = useState(false);

    useEffect(() => {
        setUserName('')
    }, [currentUser.name])

    const changeUserName = (value) => {
        setIsEditName(false);
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

            {!isEditName ?
                <View>
                    <View style={styles.labelContainer}>
                        <Label value={currentUser.id} title='UID' />
                        <Label value={currentUser.name} title='USERNAME' />
                    </View>

                    <View style={styles.button}>
                        <Button title="Change Name" onPress={() => setIsEditName(true)} />
                    </View>

                </View>
                :
                <View >
                    <View style={styles.formContainer}>
                        <Label value={currentUser.id} title='UID' />
                        <Text style={styles.title}>USERNAME</Text>
                        <TextInput
                            style={styles.input}
                            label="Username"
                            placeholder="Choose username"
                            value={userName}
                            onChangeText={userName => setUserName(userName)}
                        />

                        <View style={styles.button}>
                            <Button title="Confirm" onPress={() => changeUserName(userName)} />
                        </View>
                        <View style={styles.button}>
                            <Button title="Cancel" onPress={() => setIsEditName(false)} />
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
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 32,
    },
    input: {
        textAlign: 'center',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    title: {
        alignSelf: 'center',
        fontSize: 16,
        margin: 5
    },
    buttonContainer: {
        margin: 20,
    },
    button: {
        backgroundColor: 'red',
        marginVertical: 5,
    },

});

export default ProfileScreen;
