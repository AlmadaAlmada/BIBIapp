const BASE_URL = 'http://10.0.2.2:3100/api'; // 🔥 Coloque seu IP e porta corretos

import AsyncStorage from '@react-native-async-storage/async-storage';

export async function cadastrarUsuario(nome, email, senha, confirmarSenha) {
    try {
        const response = await fetch(`${BASE_URL}/cadastroUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome,
                email,
                senha,
                confirmarSenha,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw data;
        }

        return data; 
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        throw error;
    }
}

export async function loginUsuario(email, senha) {
    try {
        const response = await fetch(`${BASE_URL}/loginUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                senha,
            }),
        });

        const data = await response.json();

        console.log('Resposta da API de login:', data);

        if (!response.ok) {
            throw data;
        }

        await AsyncStorage.setItem('uid', data.uid);
        await AsyncStorage.setItem('token', data.token);

        return {sucesso: true, mensagem: 'Usuário logado com sucesso!'};
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error;
    }
}

export async function logoutUsuario() {
  try {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      throw { sucesso: false, mensagem: 'Token não encontrado no armazenamento local.' };
    }

    const response = await fetch(`${BASE_URL}/logoutUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    // Remove o token e UID após logout
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('uid');

    return { sucesso: true, mensagem: 'Logout realizado com sucesso.' };
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw error;
  }
}

