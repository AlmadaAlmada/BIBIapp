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

    return data;
  } catch (error) {
    
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
;
    return data;
  } catch (error) {
    console.error('Erro ao buscar peças disponíveis na BFF:', error);
    throw error;
  }
}

export async function buscarAlertaPorIdBff(uidUsuario: string, carroId: string, alertaId: string) {
  try {
    const response = await fetch(`${BASE_URL}/alertas/${uidUsuario}/${carroId}/${alertaId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    
    throw error;
  }
}


export async function editarAlertaBff(uidUsuario: string, carroId: string, alertaId: string, novaDataUltimaTroca: string) {
  try {
    const response = await fetch(`${BASE_URL}/alertas`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uidUsuario,
        carroId,
        alertaId,
        novaDataUltimaTroca,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar o retorno da edição do alerta na BFF:', error);
    throw error;
  }
}

export async function excluirAlertaBff(uidUsuario: string, carroId: string, alertaId: string ) {
  try {
    const response = await fetch(`${BASE_URL}/alertas/${uidUsuario}/${carroId}/${alertaId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    console.log('Alerta Excluido:', data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar o retorno da exclusão do alerta na BFF:', error);
    throw error;
  }
}
  
