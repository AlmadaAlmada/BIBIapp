"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const alertaServico_1 = require("../alertas/alertaServico");
const firebaseConfig_1 = require("../firebase/firebaseConfig");
const firestore_1 = require("firebase/firestore");
const firestore_2 = require("firebase/firestore");
if (process.env.USE_FIRESTORE_EMULATOR === "true") {
    (0, firestore_2.connectFirestoreEmulator)(firebaseConfig_1.db, "localhost", 8080);
}
async function testarStatusAlertaComFirestore() {
    const uidUsuario = process.env.UID_USUARIO;
    const carroId = process.env.CARRO_ID;
    const alertaId = process.env.ALERTA_ID;
    if (!uidUsuario || !carroId || !alertaId) {
        console.error("Variáveis de ambiente UID_USUARIO, CARRO_ID e ALERTA_ID são obrigatórias.");
        return;
    }
    // Buscar dados do carro
    const carroRef = (0, firestore_1.doc)(firebaseConfig_1.db, "usuarios", uidUsuario, "carros", carroId);
    const carroSnap = await (0, firestore_1.getDoc)(carroRef);
    if (!carroSnap.exists()) {
        console.error("Carro não encontrado.");
        return;
    }
    const carro = carroSnap.data();
    // Buscar dados do alerta
    const alertaRef = (0, firestore_1.doc)(firebaseConfig_1.db, "usuarios", uidUsuario, "carros", carroId, "alertas", alertaId);
    const alertaSnap = await (0, firestore_1.getDoc)(alertaRef);
    if (!alertaSnap.exists()) {
        console.error("Alerta não encontrado.");
        return;
    }
    const alerta = alertaSnap.data();
    // Extrair dados
    const peca = alerta.peca;
    const dataUltimaTroca = alerta.dataUltimaTroca.toDate ? alerta.dataUltimaTroca.toDate() : new Date(alerta.dataUltimaTroca);
    const mediaKmSemana = carro.mediaKmSemana;
    const modeloCarro = carro.modelo;
    const resultado = (0, alertaServico_1.calcularStatusAlerta)(peca, dataUltimaTroca, mediaKmSemana, modeloCarro);
    console.log("\nTeste usando dados do Firestore:");
    console.log("Peça:", peca);
    console.log("Data última troca:", dataUltimaTroca);
    console.log("Média km/semana:", mediaKmSemana);
    console.log("Modelo do carro:", modeloCarro);
    console.log("Status:", resultado.status);
    console.log("KM Restante:", resultado.kmRestante.toFixed(2));
    console.log("Meses Restantes:", resultado.mesesRestantes.toFixed(2));
}
testarStatusAlertaComFirestore();
