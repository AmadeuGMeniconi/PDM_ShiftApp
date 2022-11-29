import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

// Import Dependencies
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import RegisterAndLoginScreen from './screens/RegisterAndLoginScreen';

// Import Component
import Throbber from './components/Throbber';


const App = () => {



  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  const [user, setUser] = useState(null);

  // Listen for user state change, setting user to new _user. Then, set the initializing state to false
  useEffect(() => {
    auth().onAuthStateChanged((_user) => {
      setUser(_user);
      if (initializing) setInitializing(false);
    });
  }, []);

  // Render
  if (initializing) {
    return (
      <Throbber />
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <RegisterAndLoginScreen />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <HomeScreen />
      </View>
    );
  }



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

export default App;
