import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://10.0.2.2:3100/api'; // Atualize conforme necessário

// Interfaces
export interface ResultadoAPI {
  sucesso: boolean;
  mensagem: string;
}

export interface ResultadoLogin extends ResultadoAPI {
  token?: string;
  uid?: string;
}

// export interface ResultadoCadastro extends ResultadoAPI {
//   uid?: string;
// }

export async function cadastrarUsuario(
  nome: string,
  email: string,
  senha: string,
  confirmarSenha: string
){
  try {
    const response = await fetch(`${BASE_URL}/cadastroUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, email, senha, confirmarSenha }),
    });

    const data = await response.json();

    if (!response.ok) throw data;

    await AsyncStorage.setItem('uid', data.uid);

    return data;
  } catch (error: any) {
    console.error('Erro ao cadastrar usuário:', error);
    throw error;
  }
}

export async function loginUsuario(email: string, senha: string): Promise<ResultadoAPI> {
  try {
    const response = await fetch(`${BASE_URL}/loginUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    const data: ResultadoLogin = await response.json();

    if (!response.ok) throw data;

    if (data.token && data.uid) {
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('uid', data.uid);
    }

    return {
      sucesso: true,
      mensagem: 'Usuário logado com sucesso!',
    };
  } catch (error: any) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
}

export async function logoutUsuario(token: string): Promise<ResultadoAPI> {
  try {
    if (!token) {
      throw {
        sucesso: false,
        mensagem: 'Token não encontrado no armazenamento local.',
      };
    }

    const response = await fetch(`${BASE_URL}/logoutUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data: ResultadoAPI = await response.json();

    if (!response.ok) throw data;

    return {
      sucesso: true,
      mensagem: 'Logout realizado com sucesso.',
    };
  } catch (error: any) {
    console.error('Erro ao fazer logout:', error);
    throw error;
  }
}

export async function alteraConta(
  emailAntigo: string,
  senhaAntiga: string,
  emailNovo?: string,
  senhaNova?: string
): Promise<ResultadoAPI> {
  try {
    const response = await fetch(`${BASE_URL}/atualizarUser`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailAtual: emailAntigo,
        senhaAtual: senhaAntiga,
        ...(emailNovo && { novoEmail: emailNovo }),
        ...(senhaNova && { novaSenha: senhaNova }),
      }),
    });

    const resultado: ResultadoLogin = await response.json();

    if (!response.ok) {
      return {
        sucesso: false,
        mensagem: resultado.mensagem || `Erro ao alterar a conta no servidor (${response.status})`,
      };
    }

    return {
      sucesso: true,
      mensagem: resultado.mensagem || 'Conta alterada com sucesso!',
    };
  } catch (error) {
    console.error('Erro ao alterar conta:', error);
    return {
      sucesso: false,
      mensagem: 'Erro ao conectar com o servidor.',
    };
  }
}
