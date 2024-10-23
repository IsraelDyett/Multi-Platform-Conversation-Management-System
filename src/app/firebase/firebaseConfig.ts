// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCH4wpJlw-kcEMrnH2w0XLZIpgYO-n2WlQ",
//   authDomain: "chat-message-center.firebaseapp.com",
//   projectId: "chat-message-center",
//   storageBucket: "chat-message-center.appspot.com",
//   messagingSenderId: "866194535065",
//   appId: "1:866194535065:web:a15c55d2efe1b00c00fe08",
//   measurementId: "G-9NKYEFCCLX"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// src/app/firebase/firebaseConfig.ts



import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH4wpJlw-kcEMrnH2w0XLZIpgYO-n2WlQ",
  authDomain: "chat-message-center.firebaseapp.com",
  projectId: "chat-message-center",
  storageBucket: "chat-message-center.appspot.com",
  messagingSenderId: "866194535065",
  appId: "1:866194535065:web:a15c55d2efe1b00c00fe08",
  measurementId: "G-9NKYEFCCLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it
const db = getFirestore(app);

export { db };  // Export Firestore instance
