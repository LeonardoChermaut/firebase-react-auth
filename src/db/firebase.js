import { initializeApp } from "firebase/app";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import {
  doc,
  addDoc,
  updateDoc,
  collection,
  getFirestore,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import {
  getAuth,
  signOut,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const configuration = {
  apiKey: "AIzaSyDUmhD7a60MOudn7XLNQlVymuo4yRfXxHw",
  authDomain: "auth-development-be7d4.firebaseapp.com",
  projectId: "auth-development-be7d4",
  storageBucket: "auth-development-be7d4.appspot.com",
  messagingSenderId: "918153009233",
  appId: "1:918153009233:web:db289aba2902700c93c070",
};

export const app = initializeApp(configuration);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const employeeCollection = collection(db, "employee");

export const document = doc;
export const reference = ref;
export const addDocument = addDoc;
export const upload = uploadBytes;
export const signOutUser = signOut;
export const getDocument = getDocs;
export const updateDocUser = updateDoc;
export const getDownload = getDownloadURL;
export const updateEmailUser = updateEmail;
export const onAuthChange = onAuthStateChanged;
export const deleteDocument = deleteDoc;
export const updatePasswordUser = updatePassword;
export const passwordReset = sendPasswordResetEmail;
export const signInUser = signInWithEmailAndPassword;
export const createUser = createUserWithEmailAndPassword;
export const reauthenticate = reauthenticateWithCredential;
