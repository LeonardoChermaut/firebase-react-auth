import { initializeApp } from "firebase/app";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import { doc, addDoc, updateDoc, collection, getFirestore } from "firebase/firestore";
import { 
  getAuth, 
  signOut, 
  updateEmail, 
  updatePassword, 
  onAuthStateChanged, 
  sendPasswordResetEmail, 
  signInWithEmailAndPassword, 
  reauthenticateWithCredential, 
  createUserWithEmailAndPassword } from "firebase/auth";

const configuration = {
  apiKey: "AIzaSyDUmhD7a60MOudn7XLNQlVymuo4yRfXxHw",
  authDomain: "auth-development-be7d4.firebaseapp.com",
  projectId: "auth-development-be7d4",
  storageBucket: "auth-development-be7d4.appspot.com",
  messagingSenderId: "918153009233",
  appId: "1:918153009233:web:db289aba2902700c93c070",
};

const app = initializeApp(configuration);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const employeeCollection = collection(db, "employee");

const document = doc;
const reference = ref;
const addDocument = addDoc;
const upload = uploadBytes;
const signOutUser = signOut;
const updateDocUser = updateDoc;
const getDownload = getDownloadURL;
const updateEmailUser = updateEmail;
const onAuthChange = onAuthStateChanged;
const updatePasswordUser = updatePassword;
const passwordReset = sendPasswordResetEmail;
const signInUser = signInWithEmailAndPassword;
const createUser = createUserWithEmailAndPassword;
const reauthenticate = reauthenticateWithCredential;

export {
  db,
  app,
  auth,
  upload,
  storage,
  document,
  reference,
  signInUser,
  createUser,
  addDocument,
  signOutUser,
  getDownload,
  onAuthChange,
  updateDocUser,
  passwordReset,
  reauthenticate,
  updateEmailUser,
  employeeCollection,
  updatePasswordUser,
};
