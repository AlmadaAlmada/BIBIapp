"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.auth = void 0;
var app_1 = require("firebase/app");
var auth_1 = require("firebase/auth");
var firestore_1 = require("firebase/firestore");
var firebaseConfig = {
    apiKey: "AIzaSyDGhLc584d9tRUuy8qfnaf0acFRjqBIOW0",
    authDomain: "bibi-app-be195.firebaseapp.com",
    projectId: "bibi-app-be195",
    storageBucket: "bibi-app-be195.firebasestorage.app",
    messagingSenderId: "580355578338",
    appId: "1:580355578338:web:c6c6d792a305867df841bb",
    measurementId: "G-STWMT6LZ4P"
};
var app = (0, app_1.initializeApp)(firebaseConfig);
var auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
var db = (0, firestore_1.getFirestore)(app);
exports.db = db;
