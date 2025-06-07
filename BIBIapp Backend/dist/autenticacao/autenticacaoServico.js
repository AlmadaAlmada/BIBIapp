"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastrarUsuario = cadastrarUsuario;
exports.fazerLogin = fazerLogin;
const firebaseConfig_1 = require("../firebase/firebaseConfig");
const auth_1 = require("firebase/auth");
const usuarioServico_1 = require("../usuarios/usuarioServico");
const errosAutenticacao_1 = require("./errosAutenticacao");
const { tokenToString } = require("typescript");
async function cadastrarUsuario(nome, email, senha, confirmarSenha) {
    if (!nome || !email || !senha || !confirmarSenha) {
        return { sucesso: false, mensagem: "Todos os campos são obrigatórios." };
    }
    if (senha !== confirmarSenha) {
        return { sucesso: false, mensagem: "As senhas não coincidem." };
    }
    try {
        const usuarioCred = await (0, auth_1.createUserWithEmailAndPassword)(firebaseConfig_1.auth, email, senha);
        await (0, usuarioServico_1.salvarUsuario)(usuarioCred.user.uid, nome, email);
        return { sucesso: true, mensagem: "Usuário cadastrado com sucesso." };
    }
    catch (erro) {
        console.error("Erro detalhado do Firebase:", erro);
        return { sucesso: false, mensagem: (0, errosAutenticacao_1.traduzirErroFirebase)(erro.code) };
    }
}
async function fazerLogin(email, senha, lembrarDeMim) {
    if (!email || !senha) {
        return { sucesso: false, mensagem: "Email e senha são obrigatórios." };
    }
    try {
        await (0, auth_1.setPersistence)(firebaseConfig_1.auth, lembrarDeMim ? auth_1.browserLocalPersistence : auth_1.browserSessionPersistence);
        await (0, auth_1.signInWithEmailAndPassword)(firebaseConfig_1.auth, email, senha);
        return { sucesso: true, mensagem: "cuzinho"};
    }
    catch (erro) {
        return { sucesso: false, mensagem: (0, errosAutenticacao_1.traduzirErroFirebase)(erro.code) };
    }
}
