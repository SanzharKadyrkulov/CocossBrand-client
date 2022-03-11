// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
	apiKey: 'AIzaSyDe0Xh3TGYpgEyEy3wvTxzZLRLmj5DY-Ww',
	authDomain: 'cocossbrand.firebaseapp.com',
	projectId: 'cocossbrand',
	storageBucket: 'cocossbrand.appspot.com',
	messagingSenderId: '948339176307',
	appId: '1:948339176307:web:11521655b61456b49c8b06',
	measurementId: 'G-HDQPFWTWFJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
