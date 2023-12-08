import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAgnIQMsnXI5mxtOr_AEVUDmqXtCMFRgdw",
  authDomain: "buybusy-82a66.firebaseapp.com",
  projectId: "buybusy-82a66",
  storageBucket: "buybusy-82a66.appspot.com",
  messagingSenderId: "504249701270",
  appId: "1:504249701270:web:969a81f718bb6105ed83b7",
  measurementId: "G-PF47S3X7QE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
