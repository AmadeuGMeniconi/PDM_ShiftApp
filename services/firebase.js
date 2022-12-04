import { firebase } from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJZAbbmTVasQT621p9ASTdIt_NtYJZUbM",
};

export const initFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log('"initFirebase()" | Firebase initialized');
  } else {
    firebase.app(); // if already initialized, use that one
    console.log('"initFirebase()" | Firebase already initialized');
  }
};

export const currentAuthUser = () => auth().currentUser;

export const initCheckAuthState = () => {
  console.log('Checking auth state');
  auth().onAuthStateChanged(user => {
    if (user) {
      if (user.email === 'admin@gmail.com') {
        console.log('"initCheckAuthState()" | Administrator is signed in');
      } else {
        console.log('"initCheckAuthState()" | Client is signed in');
      }
    } else {
      console.log('"initCheckAuthState()" | No users signed in');
    }
  });
};
