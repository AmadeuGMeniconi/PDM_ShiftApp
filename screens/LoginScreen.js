import React, { useState } from 'react'
import { Button, Dimensions, TextInput, View, StyleSheet, Alert, ActivityIndicator, Text, ToastAndroid } from 'react-native';

// Services
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Redux
import { clearCurrentUser, setCurrentUser } from '../redux/reducers/currentUserSlice';
import { useDispatch } from 'react-redux';

// Navigation
import { useNavigation } from '@react-navigation/native';
import { addFirestoreUser, getFirestoreUser } from '../services/firebase';

const LoginScreen = () => {

  const dispatch = useDispatch();
  const navigator = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const saveUserInSlice = (user) => {
    getFirestoreUser(user).then((u) => dispatch(setCurrentUser(u.data())))
  };

  const signInUser = (email, password) => {
    if (email && password) {
      setIsLoading(true);
      auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          saveUserInSlice(userCredential.user);
          setIsLoading(false);
          setError('');
          navigator.navigate('Auth');
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error.message);
        });
    } else {
      Alert.alert('Insert email & password')
    }
  };

  const signUpUser = (email, password) => {
    if (email && password) {
      setIsLoading(true);
      auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          ToastAndroid.show('User created!', ToastAndroid.SHORT);
          addFirestoreUser(userCredential.user)
          setIsLoading(false);
          setError('');
        })
        .catch(error => {
          setIsLoading(false);
          setError(error.message);
        });
    } else {
      Alert.alert('Insert email & password')
    }
  }

  const logoutUser = () => {
    auth().signOut().then(() => {
      console.log('User signed out!');
      dispatch(clearCurrentUser());
      navigator.navigate('Login');
    });
  };

  return (
    <View style={styles.wrapper}>
      <TextInput style={styles.input}
        label='Email Address'
        placeholder='enter email'
        value={email}
        onChangeText={email => setEmail(email)}
        autoCapitalize={'none'}
      />

      <TextInput style={styles.input}
        label='Password'
        placeholder='enter password'
        value={password}
        onChangeText={password => setPassword(password)}
        secureTextEntry
      />
      {
        isLoading ?
          <View style={styles.buttonContainer}>
            <ActivityIndicator
              size='large'
              color='#0F5340'
            />
          </View>
          :
          <View style={styles.buttonContainer} >
            <View style={styles.button}>
              <Button title={'Sign Up'} onPress={() => signUpUser(email, password)} />
            </View>
            <View style={styles.button}>
              <Button title={'Sign In'} onPress={() => signInUser(email, password)} />
            </View>
            {/* <View style={styles.button}>
              <Button title="Logout" onPress={logoutUser} />
            </View> */}
          </View>

      }
      {
        error &&
        <View style={styles.errorBox}>
          <Text style={styles.error}>{error}</Text>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    paddingVertical: 80,
    paddingHorizontal: 80,
  },
  input: {
    width: 200,
    borderRadius: 5,
    margin: 5,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#ddd'
  },
  buttonContainer: {
    margin: 20,
  },
  button: {
    margin: 5
  },
  errorBox: {
    display: 'flex',
    justifyContent: 'center',
    width: 300,
    height: 100,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    marginTop: 20,
  },
  error: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'red',
  }
})

export default LoginScreen;
