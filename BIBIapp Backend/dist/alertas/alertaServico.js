"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PECAS_DISPONIVEIS = void 0;
exports.cadastrarAlerta = cadastrarAlerta;
exports.editarDataAlerta = editarDataAlerta;
exports.excluirAlerta = excluirAlerta;
exports.calcularStatusAlerta = calcularStatusAlerta;
exports.StatusAlertaPorId = StatusAlertaPorId;
const firebaseConfig_1 = require("../firebase/firebaseConfig");
const firestore_1 = require("firebase/firestore");
exports.PECAS_DISPONIVEIS = [
    "Óleo do motor",
    "Água do radiador",
    "Pneus",
    "Pastilhas de freios",
    "Bateria",
    "Filtro de ar",
    "Airbag",
    "Filtro de combustível"
];
async function cadastrarAlerta(uidUsuario, carroId, peca, dataUltimaTroca) {
    if (!peca || !dataUltimaTroca) {
        return { sucesso: false, mensagem: "Peça e data são obrigatórias." };
    }
    if (!exports.PECAS_DISPONIVEIS.includes(peca)) {
        return { sucesso: false, mensagem: "Peça inválida." };
    }
    const alertasRef = (0, firestore_1.collection)(firebaseConfig_1.db, "usuarios", uidUsuario, "carros", carroId, "alertas");
    const q = (0, firestore_1.query)(alertasRef, (0, firestore_1.where)("peca", "==", peca));
    const querySnapshot = await (0, firestore_1.getDocs)(q);
    if (!querySnapshot.empty) {
        return { sucesso: false, mensagem: "Já existe um alerta para essa peça neste carro." };
    }
    let data;
    try {
        const partes = dataUltimaTroca.includes("-")
            ? dataUltimaTroca.split("-").map(Number)
            : dataUltimaTroca.split("/").reverse().map(Number);
        data = firestore_1.Timestamp.fromDate(new Date(partes[0], partes[1] - 1, partes[2]));
    }
    catch {
        return { sucesso: false, mensagem: "Data inválida." };
    }
    try {
        await (0, firestore_1.addDoc)(alertasRef, {
            peca,
            dataUltimaTroca: data
        });
        return { sucesso: true, mensagem: "Alerta cadastrado com sucesso." };
    }
    catch (e) {
        return { sucesso: false, mensagem: "Erro ao cadastrar alerta." };
    }
}
async function editarDataAlerta(uidUsuario, carroId, alertaId, novaDataUltimaTroca) {
    if (!novaDataUltimaTroca) {
        return { sucesso: false, mensagem: "Data obrigatória." };
    }
    let data;
    try {
        const partes = novaDataUltimaTroca.includes("-")
            ? novaDataUltimaTroca.split("-").map(Number)
            : novaDataUltimaTroca.split("/").reverse().map(Number);
        data = firestore_1.Timestamp.fromDate(new Date(partes[0], partes[1] - 1, partes[2]));
    }
    catch {
        return { sucesso: false, mensagem: "Data inválida." };
    }
    try {
        const alertaRef = (0, firestore_1.doc)(firebaseConfig_1.db, "usuarios", uidUsuario, "carros", carroId, "alertas", alertaId);
        await (0, firestore_1.updateDoc)(alertaRef, { dataUltimaTroca: data });
        return { sucesso: true, mensagem: "Data do alerta atualizada com sucesso." };
    }
    catch (e) {
        return { sucesso: false, mensagem: "Erro ao atualizar alerta." };
    }
}
async function excluirAlerta(uidUsuario, carroId, alertaId) {
    try {
        const alertaRef = (0, firestore_1.doc)(firebaseConfig_1.db, "usuarios", uidUsuario, "carros", carroId, "alertas", alertaId);
        await (0, firestore_1.deleteDoc)(alertaRef);
        return { sucesso: true, mensagem: "Alerta excluído com sucesso." };
    }
    catch (e) {
        return { sucesso: false, mensagem: "Erro ao excluir alerta." };
    }
}
const INTERVALOS_PECA = {
    "Óleo do motor": { km: 5000, meses: 6 },
    "Água do radiador": { km: 20000, meses: 24 },
    "Pneus": { km: 40000, meses: 36 },
    "Pastilhas de freios": { km: 20000, meses: 18 },
    "Bateria": { km: 40000, meses: 36 },
    "Filtro de ar": { km: 15000, meses: 12 },
    "Airbag": { km: 100000, meses: 120 },
    "Filtro de combustível": { km: 20000, meses: 24 }
};
const PESOS_MODELO_CARRO = {
    "Corolla": 1.0,
    "Hilux": 1.1,
    "Onix": 0.95,
    "S10": 1.0,
    "DEFAULT": 1.0
};
function pesoKmSemana(mediaKmSemana) {
    if (mediaKmSemana > 400)
        return 1.2; // uso muito intenso
    if (mediaKmSemana > 200)
        return 1.1; // uso acima da média
    if (mediaKmSemana < 70)
        return 0.9; // uso leve
    return 1.0; // uso normal
}
function calcularStatusAlerta(peca, dataUltimaTroca, mediaKmSemana, modeloCarro) {
    const intervalo = INTERVALOS_PECA[peca];
    if (!intervalo)
        return { status: "ok", kmRestante: Infinity, mesesRestantes: Infinity };
    // Pesos
    const pesoModelo = PESOS_MODELO_CARRO[modeloCarro] ?? PESOS_MODELO_CARRO.DEFAULT;
    const pesoKm = pesoKmSemana(mediaKmSemana);
    // Ajuste dos intervalos
    const kmLimiteAjustado = intervalo.km / (pesoModelo * pesoKm);
    const mesesLimiteAjustado = intervalo.meses / pesoModelo;
    // Calcula semanas desde a última troca
    const agora = new Date();
    const msPorSemana = 1000 * 60 * 60 * 24 * 7;
    const semanas = Math.floor((agora.getTime() - dataUltimaTroca.getTime()) / msPorSemana);
    // Estimativas
    const kmRodados = semanas * mediaKmSemana;
    const mesesPassados = (agora.getFullYear() - dataUltimaTroca.getFullYear()) * 12 + (agora.getMonth() - dataUltimaTroca.getMonth());
    const kmRestante = kmLimiteAjustado - kmRodados;
    const mesesRestantes = mesesLimiteAjustado - mesesPassados;
    // Critérios de alerta
    const limiteKmRecomendado = kmLimiteAjustado * 0.15;
    const limiteMesesRecomendado = mesesLimiteAjustado * 0.15;
    if (kmRestante <= 0 || mesesRestantes <= 0) {
        return { status: "necessaria", kmRestante, mesesRestantes };
    }
    if (kmRestante <= limiteKmRecomendado || mesesRestantes <= limiteMesesRecomendado) {
        return { status: "recomendada", kmRestante, mesesRestantes };
    }
    return { status: "ok", kmRestante, mesesRestantes };
}
async function StatusAlertaPorId(uidUsuario, carroId, alertaId) {
    try {
        const alertaRef = (0, firestore_1.doc)(firebaseConfig_1.db, "usuarios", uidUsuario, "carros", carroId, "alertas", alertaId);
        const alertaSnap = await (0, firestore_1.getDoc)(alertaRef);
        if (!alertaSnap.exists()) {
            return { erro: "Alerta não encontrado." };
        }
        const alerta = alertaSnap.data();
        const carroRef = (0, firestore_1.doc)(firebaseConfig_1.db, "usuarios", uidUsuario, "carros", carroId);
        const carroSnap = await (0, firestore_1.getDoc)(carroRef);
        if (!carroSnap.exists()) {
            return { erro: "Carro não encontrado." };
        }
        const carro = carroSnap.data();
        const peca = alerta.peca;
        const dataUltimaTroca = new Date(alerta.dataUltimaTroca);
        const mediaKmSemana = carro.mediaKmSemana;
        const modeloCarro = carro.modelo;
        return calcularStatusAlerta(peca, dataUltimaTroca, mediaKmSemana, modeloCarro);
    }
    catch (e) {
        return { erro: "Erro ao calcular status do alerta." };
    }
}
