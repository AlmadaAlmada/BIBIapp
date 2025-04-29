"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traduzirErroFirebase = traduzirErroFirebase;
function traduzirErroFirebase(codigo) {
    switch (codigo) {
        case "auth/email-already-in-use":
            return "Email já está em uso.";
        case "auth/invalid-email":
            return "Email inválido.";
        case "auth/user-not-found":
            return "Usuário não encontrado.";
        case "auth/wrong-password":
            return "Senha incorreta.";
        case "auth/weak-password":
            return "A senha deve ter pelo menos 6 caracteres.";
        case "auth/missing-email":
            return "O campo de email é obrigatório.";
        default:
            return "Ocorreu um erro inesperado. Tente novamente.";
    }
}
