"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const autenticacaoServico_1 = require("../autenticacao/autenticacaoServico");
require("dotenv/config");
const email = process.env.EMAIL ?? "";
const senha = process.env.SENHA ?? "";
async function testarLogin() {
    const resultado = await (0, autenticacaoServico_1.fazerLogin)(email, senha, false);
    console.log("Resultado do login:", resultado);
}
testarLogin();
