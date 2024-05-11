import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDeD_xQ3RF5JBkZS5tVCxWM7FcSrwTgwqc",
	authDomain: "loginproject-fb458.firebaseapp.com",
	projectId: "loginproject-fb458",
	storageBucket: "loginproject-fb458.appspot.com",
	messagingSenderId: "181937566227",
	appId: "1:181937566227:web:a8a8ddefc0424d782145e6",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
