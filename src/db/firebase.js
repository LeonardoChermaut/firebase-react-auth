import {
  getAuth,
  signOut,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyDUmhD7a60MOudn7XLNQlVymuo4yRfXxHw",
  authDomain: "auth-development-be7d4.firebaseapp.com",
  projectId: "auth-development-be7d4",
  storageBucket: "auth-development-be7d4.appspot.com",
  messagingSenderId: "918153009233",
  appId: "1:918153009233:web:db289aba2902700c93c070",
};

const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const signOutUser = signOut;
const updateEmailUser = updateEmail;
const onAuthChange =  onAuthStateChanged;
const updatePasswordUser = updatePassword;
const passwordReset = sendPasswordResetEmail;
const signInUser = signInWithEmailAndPassword;
const credential = EmailAuthProvider.credential;
const createUser = createUserWithEmailAndPassword;
const reauthenticate = reauthenticateWithCredential;

export {
  db,
  app,
  auth,
  storage,
  signInUser,
  createUser,
  credential,
  signOutUser,
  onAuthChange,
  passwordReset,
  reauthenticate,
  updateEmailUser,
  updatePasswordUser,
};
