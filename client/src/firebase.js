// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvkS1CnFnH80XogA9Cxf4wkHBqr2gZArQ",
  authDomain: "leadgeniee3.firebaseapp.com",
  projectId: "leadgeniee3",
  storageBucket: "leadgeniee3.appspot.com",
  messagingSenderId: "999451336791",
  appId: "1:999451336791:web:4ee4359be9bc7914ee8312",
  measurementId: "G-1XG7ZP24YB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);