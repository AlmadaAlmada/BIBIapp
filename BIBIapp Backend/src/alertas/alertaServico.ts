import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, Timestamp, query, where, getDocs, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";

export const PECAS_DISPONIVEIS = [
  "Óleo do motor",
  "Água do radiador",
  "Pneus",
  "Pastilhas de freios",
  "Bateria",
  "Filtro de ar",
  "Airbag",
  "Filtro de combustível"
];

export async function cadastrarAlerta(
    uidUsuario: string,
    carroId: string,
    peca: string,
    dataUltimaTroca: string 
  ) {
    if (!peca || !dataUltimaTroca) {
      return { sucesso: false, mensagem: "Peça e data são obrigatórias." };
    }
    if (!PECAS_DISPONIVEIS.includes(peca)) {
      return { sucesso: false, mensagem: "Peça inválida." };
    }
  
    // Validação: não permitir peça duplicada
    const alertasRef = collection(db, "usuarios", uidUsuario, "carros", carroId, "alertas");
    const q = query(alertasRef, where("peca", "==", peca));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return { sucesso: false, mensagem: "Já existe um alerta para essa peça neste carro." };
    }
  
    let data;
    try {
      const partes = dataUltimaTroca.includes("-")
        ? dataUltimaTroca.split("-").map(Number)
        : dataUltimaTroca.split("/").reverse().map(Number);
      data = Timestamp.fromDate(new Date(partes[0], partes[1] - 1, partes[2]));
    } catch {
      return { sucesso: false, mensagem: "Data inválida." };
    }
  
    try {
      await addDoc(alertasRef, {
        peca,
        dataUltimaTroca: data
      });
      return { sucesso: true, mensagem: "Alerta cadastrado com sucesso." };
    } catch (e) {
      return { sucesso: false, mensagem: "Erro ao cadastrar alerta." };
    }
  }

export async function editarDataAlerta(
  uidUsuario: string,
  carroId: string,
  alertaId: string,
  novaDataUltimaTroca: string
) {
  if (!novaDataUltimaTroca) {
    return { sucesso: false, mensagem: "Data obrigatória." };
  }

  let data;
  try {
    const partes = novaDataUltimaTroca.includes("-")
      ? novaDataUltimaTroca.split("-").map(Number)
      : novaDataUltimaTroca.split("/").reverse().map(Number);
    data = Timestamp.fromDate(new Date(partes[0], partes[1] - 1, partes[2]));
  } catch {
    return { sucesso: false, mensagem: "Data inválida." };
  }

  try {
    const alertaRef = doc(
      db,
      "usuarios",
      uidUsuario,
      "carros",
      carroId,
      "alertas",
      alertaId
    );
    await updateDoc(alertaRef, { dataUltimaTroca: data });
    return { sucesso: true, mensagem: "Data do alerta atualizada com sucesso." };
  } catch (e) {
    return { sucesso: false, mensagem: "Erro ao atualizar alerta." };
  }
}

export async function excluirAlerta(
  uidUsuario: string,
  carroId: string,
  alertaId: string
) {
  try {
    const alertaRef = doc(
      db,
      "usuarios",
      uidUsuario,
      "carros",
      carroId,
      "alertas",
      alertaId
    );
    await deleteDoc(alertaRef);
    return { sucesso: true, mensagem: "Alerta excluído com sucesso." };
  } catch (e) {
    return { sucesso: false, mensagem: "Erro ao excluir alerta." };
  }
}

const INTERVALOS_PECA: { [key: string]: { km: number, meses: number } } = {
  "Óleo do motor":         { km: 5000,   meses: 6 },
  "Água do radiador":      { km: 20000,  meses: 24 },
  "Pneus":                 { km: 40000,  meses: 36 },
  "Pastilhas de freios":   { km: 20000,  meses: 18 },
  "Bateria":               { km: 40000,  meses: 36 },
  "Filtro de ar":          { km: 15000,  meses: 12 },
  "Airbag":                { km: 100000, meses: 120 },
  "Filtro de combustível": { km: 20000,  meses: 24 }
};

const PESOS_MODELO_CARRO: { [modelo: string]: number } = {
    "Corolla": 1.0,
    "Hilux": 1.1,
    "Onix": 0.95,
    "S10": 1.0,
    "DEFAULT": 1.0
};

function pesoKmSemana(mediaKmSemana: number): number {
    if (mediaKmSemana > 400) return 1.2; // uso muito intenso
    if (mediaKmSemana > 200) return 1.1; // uso acima da média
    if (mediaKmSemana < 70) return 0.9;  // uso leve
    return 1.0; // uso normal
}

export function calcularStatusAlerta(
  peca: string,
  dataUltimaTroca: Date,
  mediaKmSemana: number,
  modeloCarro: string
): { status: "ok" | "recomendada" | "necessaria", kmRestante: number, mesesRestantes: number } {
  const intervalo = INTERVALOS_PECA[peca];
  if (!intervalo) return { status: "ok", kmRestante: Infinity, mesesRestantes: Infinity };

  console.log("ENTRADA calcularStatusAlerta:", {
    peca,
    dataUltimaTroca,
    mediaKmSemana,
    modeloCarro
  });

  // Validação da data
  if (!(dataUltimaTroca instanceof Date) || isNaN(dataUltimaTroca.getTime())) {
    console.error("Data inválida em calcularStatusAlerta:", dataUltimaTroca);
    return { status: "ok", kmRestante: Infinity, mesesRestantes: Infinity };
  }

  const pesoModelo = PESOS_MODELO_CARRO[modeloCarro] ?? PESOS_MODELO_CARRO.DEFAULT;
  const pesoKm = pesoKmSemana(mediaKmSemana);

  const kmLimiteAjustado = intervalo.km / (pesoModelo * pesoKm);
  const mesesLimiteAjustado = intervalo.meses / pesoModelo;

  const agora = new Date();
  const msPorSemana = 1000 * 60 * 60 * 24 * 7;
  const semanas = Math.floor((agora.getTime() - dataUltimaTroca.getTime()) / msPorSemana);

  const kmRodados = semanas * mediaKmSemana;
  const mesesPassados = (agora.getFullYear() - dataUltimaTroca.getFullYear()) * 12 + (agora.getMonth() - dataUltimaTroca.getMonth());

  const kmRestante = kmLimiteAjustado - kmRodados;
  const mesesRestantes = mesesLimiteAjustado - mesesPassados;

  console.log(`Km restante: ${kmRestante}, Meses restantes: ${mesesRestantes}`);

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

export async function StatusAlertaPorId(
  uidUsuario: string,
  carroId: string,
  alertaId: string
): Promise<{ status: "ok" | "recomendada" | "necessaria", kmRestante: number, mesesRestantes: number } | { erro: string }> {
  try {
    const alertaRef = doc(db, "usuarios", uidUsuario, "carros", carroId, "alertas", alertaId);
    const alertaSnap = await getDoc(alertaRef);
    if (!alertaSnap.exists()) {
      return { erro: "Alerta não encontrado." };
    }
    const alerta = alertaSnap.data();

    const carroRef = doc(db, "usuarios", uidUsuario, "carros", carroId);
    const carroSnap = await getDoc(carroRef);
    if (!carroSnap.exists()) {
      return { erro: "Carro não encontrado." };
    }
    const carro = carroSnap.data();

    const peca = alerta.peca;
    const dataUltimaTroca = typeof alerta.dataUltimaTroca?.toDate === "function"
      ? alerta.dataUltimaTroca.toDate()
      : new Date(alerta.dataUltimaTroca);

    const mediaKmSemana = carro.mediaKmSemana;
    const modeloCarro = carro.modelo;

    return calcularStatusAlerta(peca, dataUltimaTroca, mediaKmSemana, modeloCarro);
  } catch (e) {
    console.error("Erro em StatusAlertaPorId:", e);
    return { erro: "Erro ao calcular status do alerta." };
  }
}


export async function listarAlertasPorCarro(
  uidUsuario: string,
  carroId: string
) {
  try {
    const alertasRef = collection(db, "usuarios", uidUsuario, "carros", carroId, "alertas");
    const querySnapshot = await getDocs(alertasRef);
    
    if (querySnapshot.empty) {
      return { sucesso: false, mensagem: "Nenhum alerta encontrado para este carro.", alertas: [] };
    }

    const alertas = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { sucesso: true, mensagem: "Alertas listados com sucesso.", alertas };
  } catch (e) {
    console.error("Erro ao listar alertas:", e);
    return { sucesso: false, mensagem: "Erro ao listar alertas." };
  }
}

export async function buscarAlertaPorId(
  uidUsuario: string,
  carroId: string,
  alertaId: string
) {
  try {
    const alertaRef = doc(db, "usuarios", uidUsuario, "carros", carroId, "alertas", alertaId);
    const alertaSnap = await getDoc(alertaRef);

    if (!alertaSnap.exists()) {
      return { sucesso: false, mensagem: "Alerta não encontrado." };
    }
    
    const alerta = {
      id: alertaSnap.id,
      ...alertaSnap.data()
    };
    return { sucesso: true, mensagem: "Alerta encontrado com sucesso.", alerta };
  } catch (e) {
    console.error("Erro ao buscar alerta por ID:", e);
    return { sucesso: false, mensagem: "Erro ao buscar alerta." };
  }
}