"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alertaServico_1 = require("../alertas/alertaServico");
require("dotenv/config");
const uidUsuario = process.env.UID_USUARIO ?? "";
const carroId = process.env.CARRO_ID ?? "";
async function testarCadastroAlerta() {
    const resultado = await (0, alertaServico_1.cadastrarAlerta)(uidUsuario, carroId, "Óleo do motor", "25/04/2025");
    console.log("Resultado do cadastro de alerta:", resultado);
}
testarCadastroAlerta();
