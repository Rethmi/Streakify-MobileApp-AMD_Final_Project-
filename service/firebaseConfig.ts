// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// @ts-ignore
import {initializeAuth , getReactNativePersistence} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

import AsyncStorage from "@react-native-async-storage/async-storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjlPyrxs5V6HoNIstOt-CjIg4hNJgFiaY",
  authDomain: "streakify-dda9d.firebaseapp.com",
  projectId: "streakify-dda9d",
  storageBucket: "streakify-dda9d.firebasestorage.app",
  messagingSenderId: "592679503076",
  appId: "1:592679503076:web:29457e2ccd1f9dea7318f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app , {
    persistence: getReactNativePersistence(),
});

export const db = getFirestore(app);