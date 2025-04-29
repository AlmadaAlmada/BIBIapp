"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const carroServico_1 = require("../carros/carroServico");
require("dotenv/config");
const uidUsuario = process.env.UID_USUARIO ?? "";
async function testarCadastroCarro() {
    const resultado = await (0, carroServico_1.cadastrarCarro)(uidUsuario, {
        nome: "Meu Corolla",
        marca: "Toyota",
        modelo: "Corolla",
        ano: 2022,
        mediaKmSemana: 150
    });
    console.log("Resultado do cadastro de carro:", resultado);
}
testarCadastroCarro();
