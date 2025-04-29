
console.log("CWD:", process.cwd());
console.log("USE_FIRESTORE_EMULATOR:", process.env.USE_FIRESTORE_EMULATOR);

import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyDGhLc584d9tRUuy8qfnaf0acFRjqBIOW0",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "bibi-app-be195.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "bibi-app-be195",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "bibi-app-be195.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "580355578338",
  appId: process.env.FIREBASE_APP_ID || "1:580355578338:web:c6c6d792a305867df841bb",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-STWMT6LZ4P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

if (process.env.USE_FIRESTORE_EMULATOR === "true") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  console.log("Firestore e Auth conectados ao emulador!");
}

export { auth, db };