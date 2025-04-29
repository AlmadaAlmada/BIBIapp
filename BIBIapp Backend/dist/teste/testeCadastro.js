"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const autenticacaoServico_1 = require("../autenticacao/autenticacaoServico");
// Troque o email para um novo a cada teste, para evitar conflito de "email já cadastrado"
const nome = "Usuário Teste";
const email = `teste${Math.floor(Math.random() * 10000)}@email.com`;
const senha = "senha123";
const confirmarSenha = "senha123";
async function testarCadastro() {
    const resultado = await (0, autenticacaoServico_1.cadastrarUsuario)(nome, email, senha, confirmarSenha);
    console.log("Resultado do cadastro:", resultado);
}
testarCadastro();
