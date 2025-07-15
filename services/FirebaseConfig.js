// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Platform } from "react-native";
import {getAuth, getReactNativePersistence, initializeAuth} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-diet-planner-8da0e.firebaseapp.com",
  projectId: "ai-diet-planner-8da0e",
  storageBucket: "ai-diet-planner-8da0e.firebasestorage.app",
  messagingSenderId: "89252329480",
  appId: "1:89252329480:web:6db8cf46c1a65b365b39bd",
  measurementId: "G-QS59Y7RXWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=Platform.OS=='web'?getAuth(app):initializeAuth(app,{
    persistence:getReactNativePersistence(ReactNativeAsyncStorage)
})