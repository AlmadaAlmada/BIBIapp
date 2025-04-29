"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastrarCarro = cadastrarCarro;
const firebaseConfig_1 = require("../firebase/firebaseConfig");
const firestore_1 = require("firebase/firestore");
const MARCAS_MODELOS = {
    "Toyota": ["Corolla", "Hilux"],
    "Chevrolet": ["Onix", "S10"]
};
const IMAGENS_MODELO = {
    "Corolla": "BIBIapp Backend\imagens\corolla.png",
    "Hilux": "BIBIapp Backend\imagens\hilux.png",
    "Onix": "BIBIapp Backend\imagens\onix.avif",
    "S10": "BIBIapp Backend\imagens\s10.avif"
};
async function cadastrarCarro(uidUsuario, dados) {
    // Validações (conferir com os meninos se a lógica está correta)
    if (!dados.nome || !dados.marca || !dados.modelo || !dados.ano || !dados.mediaKmSemana) {
        return { sucesso: false, mensagem: "Todos os campos são obrigatórios." };
    }
    if (!MARCAS_MODELOS[dados.marca]) {
        return { sucesso: false, mensagem: "Marca inválida." };
    }
    if (!MARCAS_MODELOS[dados.marca].includes(dados.modelo)) {
        return { sucesso: false, mensagem: "Modelo inválido para a marca selecionada." };
    }
    const anoAtual = new Date().getFullYear();
    if (dados.ano < 1980 || dados.ano > anoAtual) {
        return { sucesso: false, mensagem: "Ano do carro inválido." };
    }
    if (dados.mediaKmSemana <= 0) {
        return { sucesso: false, mensagem: "Média de km por semana deve ser positiva." };
    }
    const imagemUrl = IMAGENS_MODELO[dados.modelo];
    try {
        await (0, firestore_1.addDoc)((0, firestore_1.collection)(firebaseConfig_1.db, "usuarios", uidUsuario, "carros"), {
            ...dados,
            imagemUrl
        });
        return { sucesso: true, mensagem: "Carro cadastrado com sucesso." };
    }
    catch (e) {
        return { sucesso: false, mensagem: "Erro ao cadastrar carro." };
    }
}
