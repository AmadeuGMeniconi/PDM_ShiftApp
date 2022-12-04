import React, { useState } from 'react'
import { Button, Dimensions, TextInput, View, StyleSheet, Alert, ActivityIndicator, Text, ToastAndroid } from 'react-native';

// Services
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

// Redux
import { addUser } from '../redux/reducers/currentUserSlice';
import { useDispatch } from 'react-redux';

// Navigation
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {

  const dispatch = useDispatch();
  const navigator = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const saveUserInSlice = (uid) => {
    firebase.database().ref(`users/${uid}`).once('value', snapshot => {
      const data = snapshot.val();
      dispatch(addUser(data));
    });
  }

  const saveUserInFirebaseDatabase = (user) => {
    const { email, uid } = user;
    let userToSaveOnDatabase;
    if (email === 'admin@email.com') {
      userToSaveOnDatabase = { email: email, id: uid, role: 'admin' };
    } else {
      userToSaveOnDatabase = { email: email, id: uid, role: 'client' };
    }

    firebase.app().database()
      .ref(`/users/${uid}`)
      .set(userToSaveOnDatabase)
      .then(() => {
        ToastAndroid.show('User added to Database', ToastAndroid.SHORT);
        saveUserInSlice(uid);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginUser = (email, password) => {
    if (email && password) {
      setIsLoading(true);
      auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          saveUserInSlice(userCredential.user.uid);
          setIsLoading(false);
          setError('');
          navigator.navigate('Auth');
        })
        .catch((error) => {
          // console.log("login falhou:  " + error);
          auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
              ToastAndroid.show('User created!', ToastAndroid.SHORT);
              saveUserInFirebaseDatabase(userCredential.user);
              setIsLoading(false);
              setError('');
              navigator.navigate('Auth');
            })
            .catch(error => {
              setIsLoading(false);
              setError(error.message);
            });
        });
    } else {
      Alert.alert('Insert email & password')
    }

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
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => loginUser(email, password)}
              title={'Sign In'}
            />

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
    backgroundColor: 'white'
  },
  buttonContainer: {
    margin: 20
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
