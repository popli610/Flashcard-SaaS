// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1plxvST3dAXji4Kkvh8PkkVFxdQ3Yg3k",
  authDomain: "flashcard-saas-ee680.firebaseapp.com",
  projectId: "flashcard-saas-ee680",
  storageBucket: "flashcard-saas-ee680.appspot.com",
  messagingSenderId: "530985263179",
  appId: "1:530985263179:web:626eb3276bfe825fbbadce",
  measurementId: "G-9YJYTCP1FM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);