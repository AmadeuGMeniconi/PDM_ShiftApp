import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

// Import Dependencies
import auth from '@react-native-firebase/auth';


const SignOutButton = () => {

  // Sign Out
  const signOut = () => {
    auth().signOut();
  };

  // Render
  return (
    <View style={styles.container}>
      <Button title='Logout' onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
  }
});

export default SignOutButton;