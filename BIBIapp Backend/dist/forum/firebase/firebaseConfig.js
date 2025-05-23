"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("CWD:", process.cwd());
console.log("USE_FIRESTORE_EMULATOR:", process.env.USE_FIRESTORE_EMULATOR);
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.db = (0, firestore_1.getFirestore)(app);
console.log("USE_FIRESTORE_EMULATOR:", process.env.USE_FIRESTORE_EMULATOR);
if (process.env.USE_FIRESTORE_EMULATOR === "true") {
    (0, firestore_1.connectFirestoreEmulator)(exports.db, "localhost", 8080);
    console.log("Firestore conectado ao emulador na porta 8080");
}
