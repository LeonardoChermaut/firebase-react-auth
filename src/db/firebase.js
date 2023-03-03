import {
  getAuth,
  signOut,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
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
 const passwordReset = sendPasswordResetEmail;
 const signInUser = signInWithEmailAndPassword;
 const createUser = createUserWithEmailAndPassword;

export { app, auth, db, storage, signOutUser, passwordReset, signInUser, createUser };