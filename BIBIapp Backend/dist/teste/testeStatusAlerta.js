"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const firestore_1 = require("firebase/firestore");
const firebaseConfig_1 = require("../firebase/firebaseConfig");
if (process.env.USE_FIRESTORE_EMULATOR === "true") {
    (0, firestore_1.connectFirestoreEmulator)(firebaseConfig_1.db, "localhost", 8080);
}
const alertaServico_1 = require("../alertas/alertaServico");
async function testarStatusAlertaPorId() {
    const uidUsuario = process.env.UID_USUARIO;
    const carroId = process.env.CARRO_ID;
    const alertaId = process.env.ALERTA_ID;
    if (!uidUsuario || !carroId || !alertaId) {
        console.error("Variáveis de ambiente UID_USUARIO, CARRO_ID e ALERTA_ID são obrigatórias.");
        return;
    }
    const resultado = await (0, alertaServico_1.StatusAlertaPorId)(uidUsuario, carroId, alertaId);
    console.log("Resultado do StatusAlertaPorId:", resultado);
    if ("erro" in resultado) {
        console.error("Erro:", resultado.erro);
        process.exit(1);
    }
    else {
        if (["ok", "recomendada", "necessaria"].includes(resultado.status)) {
            console.log("Teste passou!");
            process.exit(0);
        }
        else {
            console.error("Status inesperado:", resultado.status);
            process.exit(1);
        }
    }
}
testarStatusAlertaPorId();
