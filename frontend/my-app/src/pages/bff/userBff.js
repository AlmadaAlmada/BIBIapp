const BASE_URL = 'http://192.168.3.6:3100/api'; // 🔥 Coloque seu IP e porta corretos

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
            //adicionado para conseguir o nome do usuário
        await AsyncStorage.setItem('nome', nome);
        console.log('Nome salvo no AsyncStorage após cadastro:', nome);

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

        //verificar se está sendo executado
        if (data.uid) { // SE data.uid NÃO ESTIVER VINDO, este bloco não é executado
            await AsyncStorage.setItem('uid', data.uid);
            console.log('UID salvo no AsyncStorage após login:', data.uid);
        } else {
            // 🔥 Adicione um alerta ou log CLARO se o UID não vier
            console.error('ERRO: UID não retornado na resposta do login!', data);
            throw new Error('UID não recebido do servidor.'); // Interrompe o fluxo para o usuário
        }

        await AsyncStorage.setItem('uid', data.uid);

        return {sucesso: true, mensagem: 'Usuário logado com sucesso!'};// { sucesso: true, mensagem: "..." }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error;
    }
}
