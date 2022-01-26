
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import 'firebase/compat/storage';
// import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyA-Va1ogxKMcd4DiZxhPOHXzZ2MfDri9gM",
	authDomain: "ofspace-project.firebaseapp.com",
	projectId: "ofspace-project",
	storageBucket: "ofspace-project.appspot.com",
	messagingSenderId: "577757824138",
	appId: "1:577757824138:web:0dd098d8ef2c5ea9ca1973"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// const app = initializeApp(firebaseConfig);
let storage = firebase.storage()
export default storage
