const BASE_URL = 'http://192.168.3.6:3100/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function createPost(autorId: string, autorNome:string, texto: string) {
    try{
        const response = await fetch(`${BASE_URL}/posts`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                autorId,
                autorNome,
                texto
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensagem || 'Erro desconhecido ao criar post');
        }

        return data;

    }catch(error){
        console.error('Erro ao criar post no BFF:', error);
        throw error;
    }
}

export async function listarPosts() {
    try{
        const response = await fetch(`${BASE_URL}/posts/all`);
        const data = await response.json();

        if(!response.ok){
            throw new Error (data.mensagem || 'Erro ao listar posts');
        }

        return data;
    } catch (error) {
        console.error('Erro ao listar posts no BFF:', error);
        throw error;
    }
}