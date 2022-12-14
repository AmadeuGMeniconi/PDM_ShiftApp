import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Services
import auth from '@react-native-firebase/auth';
import { deleteAuthUser, updateFirestoreUserName } from '../services/firebase';

// Redux
import { changeCurrentUserName, clearCurrentUser } from '../redux/reducers/currentUserSlice';
import { useDispatch, useSelector } from 'react-redux';

// Component
import Label from '../components/Label';
import SimpleButton from '../components/SimpleButton';
import Throbber from '../components/Throbber';
import LabelInput from '../components/LabelInput';

// My Colors
import { colors } from '../styles/MyColors';


const ProfileScreen = () => {

    const dispatch = useDispatch();
    const navigator = useNavigation();

    const currentUser = useSelector(store => store.currentUser);

    const [userName, setUserName] = useState('');
    const [isEditName, setIsEditName] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setUserName('');
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
                    <Label value={currentUser.uid} title='UID' />
                    <Label value={currentUser.role} title='ROLE' />
                    <Label value={currentUser.name} title='NAME' />
                    <SimpleButton color={colors.theme1.aquamarine} title={'CHANGE NAME'} onPress={() => setIsEditName(true)} />
                </View>
                :
                <View >
                    <Label value={currentUser.uid} title='UID' />
                    <Label value={currentUser.role} title='ROLE' />
                    <LabelInput label={'NAME'} placeholder={'username'} value={userName} setUserName={setUserName} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <SimpleButton width={170} color={colors.theme1.aquamarine} title={'CONFIRM'} onPress={() => updateUserName(userName)} />
                        <SimpleButton width={170} color={colors.theme1.lightAtomicTangerine} title={'CANCEL'} onPress={() => setIsEditName(false)} />
                    </View>
                </View>}

            {isLoading ?
                <View>
                    <Throbber />
                </View>
                :
                <View style={{ marginTop: 160 }}>
                    <SimpleButton title={'LOG OUT'} onPress={logOutUser} />
                    <SimpleButton color={colors.theme1.paradisePink} title={'DELETE'} onPress={deleteUser} />
                </View>}

        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flex: 1,
        backgroundColor: colors.theme1.lightGray,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
});

export default ProfileScreen;
