import React, { useState } from 'react'
import { TextInput, View, StyleSheet, Alert, ToastAndroid } from 'react-native';

// Services
import auth from '@react-native-firebase/auth';

// Redux
import { setCurrentUser } from '../redux/reducers/currentUserSlice';
import { useDispatch } from 'react-redux';

// Navigation
import { useNavigation } from '@react-navigation/native';
import { addFirestoreUser, getFirestoreUser } from '../services/firebase';

// Components
import SimpleButton from '../components/SimpleButton';
import Throbber from '../components/Throbber';

// My Colors
import { colors } from '../styles/MyColors';

const LoginScreen = () => {

  const dispatch = useDispatch();
  const navigator = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const saveUserInSlice = (user) => {
    getFirestoreUser(user).then((userDoc) => dispatch(setCurrentUser(userDoc.data())));
  };

  const signInUser = (email, password) => {
    if (email && password) {
      setIsLoading(true);
      auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          saveUserInSlice(userCredential.user);
          setIsLoading(false);
          navigator.navigate('Auth');
        })
        .catch((error) => {
          Alert.alert(error.message);
          setIsLoading(false);
        });
    } else {
      Alert.alert('Insert email & password');
    }
  };

  const signUpUser = (email, password) => {
    if (email && password) {
      setIsLoading(true);
      auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          ToastAndroid.show('User created!', ToastAndroid.SHORT);
          addFirestoreUser(userCredential.user);
          setIsLoading(false);
        })
        .catch(error => {
          Alert.alert(error.message);
          setIsLoading(false);
        });
    } else {
      Alert.alert('Insert email & password')
    }
  };

  return (
    <View style={styles.wrapper}>
      <TextInput style={styles.input}
        label='Email Address'
        placeholder='email'
        value={email}
        onChangeText={email => setEmail(email)}
        autoCapitalize={'none'}
      />
      <TextInput style={styles.input}
        label='Password'
        placeholder='password'
        value={password}
        onChangeText={password => setPassword(password)}
        secureTextEntry
      />

      {isLoading ?
        <Throbber />
        :
        <View style={{ marginTop: 30 }} >
          <SimpleButton title={'SIGN UP'} onPress={() => signUpUser(email, password)} />
          <SimpleButton title={'SIGN IN'} onPress={() => signInUser(email, password)} />
        </View>}

    </View>
  )
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: colors.theme1.lightGray,
    paddingTop: 80,
    paddingHorizontal: 80,
  },
  input: {
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 30,
    borderRadius: 80,
    marginVertical: 5,
    backgroundColor: 'white',
  },
});

export default LoginScreen;
