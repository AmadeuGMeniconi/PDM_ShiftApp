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

export const addTaskToFirebaseUser = async (user, task) => {
  ToastAndroid.show(`Task added to ${user.email} Document`, ToastAndroid.SHORT);
  const arrayUnion = firestore.FieldValue.arrayUnion(task)
  firestore().collection('users').doc(`${user.uid}`)
    .update({
      tasks: arrayUnion
    })
}

// export const updateTaskFromFirebaseUser = async (user, task) => {
//   ToastAndroid.show(`Task updated in ${user.email} Document`, ToastAndroid.SHORT);
//   const arrayUnion = firestore.FieldValue.arrayUnion(task)
//   firestore().collection('users').doc(`${user.uid}`)
//     .update({
//       tasks: arrayUnion.isEqual
//     })
//   // firestore().collection('users').doc(`${user.uid}`).onSnapshot(snap => {
//   //   firestore().doc(`${user.id}`).update({
//   //     tasks: firebase.firestore.FieldValue.arrayUnion(
//   //       snap.data().tasks.filter(field => field.isDone == task.isDone))
//   //   })
//   // })
// }

export const removeTaskFromFirebaseUser = async (user, task) => {
  ToastAndroid.show(`Task removed from ${user.email} Document`, ToastAndroid.SHORT);
  const arrayRemove = firestore.FieldValue.arrayRemove(task)
  firestore().collection('users').doc(`${user.uid}`)
    .update({
      tasks: arrayRemove
    })
}

export const realTimeFirestoreUser = async (user, dispatch, callbackSet) => {
  useEffect(() => {
    const unsubscribe = firestore().collection(`users`)
      .doc(`${user.uid}`)
      .onSnapshot(documentSnapshot => {
        console.log(documentSnapshot.get('tasks'))
        dispatch(callbackSet(documentSnapshot.get('tasks')));

      });
    // Stop listening for updates when no longer required
    return () => unsubscribe();
  }, []);
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