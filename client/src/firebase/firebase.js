import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPaUdMpU2ev-2Jgrzgq8dVusSbYnfBj7s",
  authDomain: "chiniapp-895b8.firebaseapp.com",
  databaseURL: "https://chiniapp-895b8-default-rtdb.firebaseio.com",
  projectId: "chiniapp-895b8",
  storageBucket: "chiniapp-895b8.appspot.com",
  messagingSenderId: "188088342779",
  appId: "1:188088342779:web:03d6957ec42d0ef7bc785e",
};


export const app = initializeApp(firebaseConfig);
export const firebase_auth = getAuth(app);