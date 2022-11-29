import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

// Import Dependencies
import auth from '@react-native-firebase/auth';

// Import Components
import SignOutButton from '../components/SignOutButton';


const HomeScreen = () => {


    // Render
    return (
        <View style={styles.container} >
            <Text style={styles.label} >Welcome</Text>
            <SignOutButton />
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
