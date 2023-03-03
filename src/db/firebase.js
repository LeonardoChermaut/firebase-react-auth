import {
  getAuth,
  signOut,
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

export const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const signOutUser = signOut;
export const signInUser = signInWithEmailAndPassword;
export const createUser = createUserWithEmailAndPassword;
