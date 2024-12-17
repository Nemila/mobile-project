import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC76f-mgD6NyKOYtJjFUhUoCtXry_M0IGE",
  authDomain: "mobile-project-586ba.firebaseapp.com",
  projectId: "mobile-project-586ba",
  storageBucket: "mobile-project-586ba.firebasestorage.app",
  messagingSenderId: "818749178853",
  appId: "1:818749178853:web:c04e66a5ec5173cf55250c",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP);
