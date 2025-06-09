const BASE_URL = 'http://10.0.2.2:3100/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function cadastrarAlerta(
  uidUsuario: string,
  carroId: string,
  peca: string,
  dataUltimaTroca: string
){ 

  try {
    const response = await fetch(`${BASE_URL}/alertas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uidUsuario,
        carroId,
        peca,
        dataUltimaTroca,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    await AsyncStorage.setItem('idAlerta', data.idAlerta);

    return {sucesso: true, mensagem: "FINALMENTE ALERTA DO CARALHO PORRA CARRO"};
  } catch (error) {
    console.error('Erro ao cadastrar carro na BFF:', error);
    throw error;
  }
}

export async function listarAlertasComStatusBff(
  uidUsuario: string,
  carroId: string
){ 
  console.log("CADE O ID DO USUARIO PARA LISTAR OS PARAMETROS DE LISTAR ALERTAS COM STATUS?", uidUsuario);
  console.log("CADE O ID DO CARRO PARA LISTAR OS PARAMETROS DE LISTAR ALERTAS COM STATUS?", carroId);
  try {
    const response = await fetch(`${BASE_URL}/alertas/status/${uidUsuario}/${carroId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }


    console.log("xique xique -> " + response);
    console.log('dados do bff:', data);
    return data;
  } catch (error) {
    console.error('Erro ao listar alertas com status na BFF:', error);
    throw error;
  }
}

export async function obterPecasDisponiveis() {
  try {
    const response = await fetch(`${BASE_URL}/alertas/pecas-disponiveis`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    console.log('Peças disponíveis:', data.pecas);
    return data;
  } catch (error) {
    console.error('Erro ao buscar peças disponíveis na BFF:', error);
    throw error;
  }
}


  
