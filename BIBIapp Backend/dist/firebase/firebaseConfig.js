"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.auth = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("CWD:", process.cwd());
console.log("USE_FIRESTORE_EMULATOR:", process.env.USE_FIRESTORE_EMULATOR);
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "AIzaSyDGhLc584d9tRUuy8qfnaf0acFRjqBIOW0",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "bibi-app-be195.firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID || "bibi-app-be195",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "bibi-app-be195.firebasestorage.app",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "580355578338",
    appId: process.env.FIREBASE_APP_ID || "1:580355578338:web:c6c6d792a305867df841bb",
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-STWMT6LZ4P"
};
const app = (0, app_1.initializeApp)(firebaseConfig);
const auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
const db = (0, firestore_1.getFirestore)(app);
exports.db = db;
if (process.env.USE_FIRESTORE_EMULATOR === "true") {
    (0, auth_1.connectAuthEmulator)(auth, "http://localhost:9099");
    (0, firestore_1.connectFirestoreEmulator)(db, "localhost", 8080);
    console.log("Firestore e Auth conectados ao emulador!");
}
