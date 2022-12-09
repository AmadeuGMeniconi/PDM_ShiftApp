import { firebase } from "@react-native-firebase/app";
import firestore from '@react-native-firebase/firestore'
import auth from "@react-native-firebase/auth";
import { useEffect } from "react";
import { ToastAndroid } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyCJZAbbmTVasQT621p9ASTdIt_NtYJZUbM",
};

export const initFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase initialized');
  } else {
    firebase.app(); // if already initialized, use that one
    console.log('Firebase already initialized');
  }
};

export const initCheckAuthState = () => {
  console.log('Checking auth state...');
  auth().onAuthStateChanged(user => {
    if (user) {
      if (user.email === 'admin@email.com') {
        console.log('- Administrator is signed in');
      } else {
        console.log('- Worker is signed in');
      }
    } else {
      console.log('- No users signed in');
    }
  });
};

// Firestore
export const addFirestoreUser = async (user) => {
  if (user.email === 'admin@email.com') {
    ToastAndroid.show('Admin added to Firestore Collection', ToastAndroid.SHORT);
    return firestore().collection('users').doc(`${user.uid}`)
      .set({
        email: user.email,
        uid: user.uid,
        role: 'ADMIN'
      });
  } else {
    ToastAndroid.show('Worker added to Firestore Collection', ToastAndroid.SHORT);
    return firestore().collection('users').doc(`${user.uid}`)
      .set({
        email: user.email,
        uid: user.uid,
        role: 'WORKER',
      });
  }
}

export const updateFirestoreUserName = async (user, name) => {
  ToastAndroid.show(`User name changed in ${user.email}'s Document`, ToastAndroid.SHORT)
  firestore().collection('users').doc(`${user.uid}`)
    .update({
      name: name
    })
}

export const getFirestoreUser = async (user) => {
  return firestore().collection(`users`)
    .doc(`${user.uid}`)
    .get()
}

// export const addTaskToFirebaseUser = async (user) => {
//   ToastAndroid.show(`Task added to ${user.email} Tasks Collection`, ToastAndroid.SHORT);
//   firestore().collection('users').doc(`${user.uid}`)
//     .collection('tasks')
//     .add({
//       title: 'Task1',
//       date: '01/01/01'
//     }).then((data) => {
//       let taskUid = data.path.split('/').slice(-1).toString();
//       firestore().collection('users').doc(`${user.uid}`)
//         .collection('tasks').doc(`${taskUid}`).update({
//           uid: taskUid
//         })
//     });
// }


export const addTaskToFirebaseUser = async (user, task) => {
  ToastAndroid.show(`Tasks added to ${user.email} Document`, ToastAndroid.SHORT);
  firestore().collection('users').doc(`${user.uid}`)
    .update({
      tasks: firestore.FieldValue.arrayUnion(task)
    })
}

export const realTimeFirestoreUser = (user) => {
  useEffect(() => {
    const unsubscribe = firestore().collection(`users`)
      .doc(`${user.uid}`)
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => unsubscribe();
  }, [user]);
}

export const realTimeFirestoreAllWorkerUsers = (callbackSetUserList, callbackSetIsLoading) => {
  useEffect(() => {
    callbackSetIsLoading(true) //callback sets isLoading state to true
    const unsubscribe = firestore().collection(`users`)
      .onSnapshot(collectionSnapshot => {
        const list = [] //for each doc in 'users' collection, push that doc.data() to list
        collectionSnapshot.docs.forEach(user => {
          if (user.data().role !== 'ADMIN' && !list.includes(user)) list.push(user.data());
        });
        callbackSetUserList(list) //callback recieves a list of all users data that are not admins as argument
        callbackSetIsLoading(false) //callback sets isLoading state to false
      });

    // Stop listening for updates when no longer required
    return () => unsubscribe();
  }, []);
}