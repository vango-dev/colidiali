// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:
    'AIzaSyDxiJ1eVVzae5q4L6BIqGujvHcmqdQBuVwSyDPCQ-j10xOGOIDjmbgu-HtFPA3_CVYNiU',
  authDomain: 'global-606be.firebaseapp.com',
  projectId: 'global-606be',
  storageBucket: 'global-606be.appspot.com',
  messagingSenderId: '1098416616259',
  appId: '1:1098416616259:web:5435ba44fc716a542d35f6',
  measurementId: 'G-91C7X5SY47',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage();
export const auth = getAuth();
