// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBIMpUBKge506e9eA3cduqUGp6U6Uimz70",
//   authDomain: "galvanic-idiom-421414.firebaseapp.com",
//   projectId: "galvanic-idiom-421414",
//   storageBucket: "galvanic-idiom-421414.appspot.com",
//   messagingSenderId: "962135876211",
//   appId: "1:962135876211:web:a8515367bc92972266c006",
//   measurementId: "G-WNN5RR9J18"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBIMpUBKge506e9eA3cduqUGp6U6Uimz70",
  authDomain: "galvanic-idiom-421414.firebaseapp.com",
  projectId: "galvanic-idiom-421414",
  storageBucket: "galvanic-idiom-421414.appspot.com",
  messagingSenderId: "962135876211",
  appId: "1:962135876211:web:a8515367bc92972266c006",
  measurementId: "G-WNN5RR9J18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage(app)

export { firestore , storage};
