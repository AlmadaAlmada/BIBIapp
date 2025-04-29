"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salvarUsuario = salvarUsuario;
const firebaseConfig_1 = require("../firebase/firebaseConfig");
const firestore_1 = require("firebase/firestore");
async function salvarUsuario(uid, nome, email) {
    await (0, firestore_1.setDoc)((0, firestore_1.doc)(firebaseConfig_1.db, "usuarios", uid), {
        nome,
        email,
        criadoEm: new Date()
    });
}
