"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alertaServico_1 = require("../alertas/alertaServico");
require("dotenv/config");
const uidUsuario = process.env.UID_USUARIO ?? "";
const carroId = process.env.CARRO_ID ?? "";
const alertaId = process.env.ALERTA_ID ?? "";
async function testarExcluirAlerta() {
    const resultado = await (0, alertaServico_1.excluirAlerta)(uidUsuario, carroId, alertaId);
    console.log("Resultado da exclusão do alerta:", resultado);
}
testarExcluirAlerta();
