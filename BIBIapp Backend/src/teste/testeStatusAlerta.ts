import dotenv from "dotenv";
dotenv.config();

import { connectFirestoreEmulator } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
if (process.env.USE_FIRESTORE_EMULATOR === "true") {
  connectFirestoreEmulator(db, "localhost", 8080);
}

import { StatusAlertaPorId } from "../alertas/alertaServico";

async function testarStatusAlertaPorId() {
  const uidUsuario = process.env.UID_USUARIO;
  const carroId = process.env.CARRO_ID;
  const alertaId = process.env.ALERTA_ID;

  if (!uidUsuario || !carroId || !alertaId) {
    console.error("Variáveis de ambiente UID_USUARIO, CARRO_ID e ALERTA_ID são obrigatórias.");
    return;
  }

  const resultado = await StatusAlertaPorId(uidUsuario, carroId, alertaId);

  console.log("Resultado do StatusAlertaPorId:", resultado);

  if ("erro" in resultado) {
    console.error("Erro:", resultado.erro);
    process.exit(1);
  } else {
    if (["ok", "recomendada", "necessaria"].includes(resultado.status)) {
      console.log("Teste passou!");
      process.exit(0);
    } else {
      console.error("Status inesperado:", resultado.status);
      process.exit(1);
    }
  }
}

testarStatusAlertaPorId();
