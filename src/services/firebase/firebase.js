import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBr0nEQALQhurbtvH0A29hvjsHJhpVwZfA",
  authDomain: "auth-production-3143a.firebaseapp.com",
  projectId: "auth-production-3143a",
  storageBucket: "auth-production-3143a.appspot.com",
  messagingSenderId: "1057288213550",
  appId: "1:1057288213550:web:a753d2d8a967674e5ebbbf"
};

export const app = firebase.initializeApp(config);

export const auth = app.auth();
