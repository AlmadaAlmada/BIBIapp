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


  
