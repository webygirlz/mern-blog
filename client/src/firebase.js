// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyAzCzjWQmjr1aNXedy9VhDjZFRu8waFdis',
  authDomain: "blog-website-44f36.firebaseapp.com",
  projectId: "blog-website-44f36",
  storageBucket: "blog-website-44f36.appspot.com",
  messagingSenderId: "221903430339",
  appId: "1:221903430339:web:de16320d9b2455d5b8b876"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// eslint-disable-next-line
const auth = getAuth(app);