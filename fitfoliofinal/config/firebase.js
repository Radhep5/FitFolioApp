import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9pUvcLebr3puCEasDG5ybqTtYPVgfCOM",
  authDomain: "fitfoliodb.firebaseapp.com",
  projectId: "fitfoliodb",
  storageBucket: "fitfoliodb.appspot.com",
  messagingSenderId: "532282277003",
  appId: "1:532282277003:web:c716398275df5480baa88e",
  measurementId: "G-2J885T04R8",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const trackerDB = getFirestore(app);
const auth = getAuth(app);
export { trackerDB };
export { auth };
