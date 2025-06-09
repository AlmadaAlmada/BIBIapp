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
            throw data; // 🔥 O backend já retorna {sucesso: false, mensagem: "..."}
        }

        return data; // 🔥 Vai retornar {sucesso: true, mensagem: "..."}
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

        await AsyncStorage.setItem('uid', data.uid); //analise essa linha chat

        return {sucesso: true, mensagem: 'Usuário logado com sucesso!'};// { sucesso: true, mensagem: "..." }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error;
    }
}
