const BASE_URL = 'http://10.0.2.2:3100/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ResultadoCadastro {
  sucesso: boolean;
  mensagem: string;
}

interface ResultadoBusca {
  sucesso: boolean;
  marcas: string[];
  modelos: {
    [marca: string]: string[];
  };
}

export async function cadastrarCarro(
  uidUsuario: string,
  nome: string,
  marca: string,
  modelo: string,
  ano:number,
  mediaKmSemana: number
): Promise<ResultadoCadastro> {
  

  try {
    const response = await fetch(`${BASE_URL}/cadastroCarro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uidUsuario,
        nome,
        marca,
        modelo,
        ano,
        mediaKmSemana,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    await AsyncStorage.setItem('idCarro', data.idCarro);


    return {sucesso: true, mensagem: "FINALMENTE BFF PORRA CARRO"};
  } catch (error) {
    console.error('Erro ao cadastrar carro na BFF:', error);
    throw error;
  }
}

export async function buscarCarros(): Promise<ResultadoBusca> {
  try {
    const response = await fetch(`${BASE_URL}/obterMarcasModelo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: ResultadoBusca = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar marcas e modelos:', error);
    throw error;
  }
}

export async function buscarDadosCarroBff(uidUsuario: string,) {
  try {
    const response = await fetch(`${BASE_URL}/carros/${uidUsuario}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    console.log('Response', response);
    console.log('Resposta da API de marcas e modelos:', data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar marcas e modelos:', error);
    throw error;
  }
}
