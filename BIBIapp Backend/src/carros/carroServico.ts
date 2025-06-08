import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

  export const MARCAS_MODELOS: { [key: string]: string[] } = {
    "Toyota": ["Corolla", "Hilux"],
    "Chevrolet": ["Onix", "S10"]
  };

  const IMAGENS_MODELO: { [key: string]: string } = {
    "Corolla": "BIBIapp Backend\imagens\corolla.png",
    "Hilux": "BIBIapp Backend\imagens\hilux.png",
    "Onix": "BIBIapp Backend\imagens\onix.avif",
    "S10": "BIBIapp Backend\imagens\s10.avif"
  };

export async function cadastrarCarro(
  uidUsuario: string,
  dados: {
    nome: string,
    marca: string,
    modelo: string,
    ano: number,
    mediaKmSemana: number
  }
) {
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
    const documenta = await addDoc(collection(db, "usuarios", uidUsuario, "carros"), {
      ...dados,
      imagemUrl
    });

    const idCarro = documenta.id;
    console.log("id do carro aa", idCarro);
    console.log(documenta.id);

    return {
      sucesso: true,
      mensagem: "sucesso ao cadastrar carro adadasd",
      idCarro: documenta.id
    };

  } catch (e) {
    return { sucesso: false, mensagem: "Erro ao cadastrar carro." };
  }
}

export const buscarCarros = () => {
 
    const marcas = MARCAS_MODELOS;
    const modelos =MARCAS_MODELOS;
    
    return { 
      sucesso: true, 
      mensagem: "sucesso ao realizar login.", 
      marcas: marcas, 
      modelos: modelos, 
    };
}
