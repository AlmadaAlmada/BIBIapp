import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://10.0.2.2:3100/api';

export interface ResultadoPost {
  sucesso: boolean;
  mensagem: string;
  post?: any;
}

export interface ResultadoListagem {
  sucesso: boolean;
  mensagem: string;
  dados?: any[];
}

export interface ResultadoOperacao {
  sucesso: boolean;
  mensagem: string;
}

export async function criarPostBff(
  autorId: string,
  texto: string
): Promise<ResultadoPost> {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ autorId, texto }),
    });

    const data: ResultadoPost = await response.json();

    if (!response.ok) {
      throw data;
    }

    await AsyncStorage.setItem('idPostagem', data.post.id);
    console.log(data.post.id);

    return data;
  } catch (error) {
    console.error('Erro ao criar post no BFF:', error);
    throw error;
  }
}


export async function listarPostsBff(userId: string, busca?: string): Promise<ResultadoListagem> {
  try {
    const url = busca
      ? `${BASE_URL}/posts/${userId}?search=${encodeURIComponent(busca)}`
      : `${BASE_URL}/posts/${userId}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: ResultadoListagem = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    console.error('Erro ao listar posts do usuário no BFF:', error);
    throw error;
  }
}

export async function listarTodosPostsBff(): Promise<ResultadoListagem> {
  try {
    const response = await fetch(`${BASE_URL}/posts/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: ResultadoListagem = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    console.error('Erro ao listar todos os posts no BFF:', error);
    throw error;
  }
}

export async function pesquisarPostsBff(busca: string): Promise<ResultadoListagem> {
  try {
    const response = await fetch(`${BASE_URL}/posts/search?search=${encodeURIComponent(busca)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: ResultadoListagem = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    console.error('Erro ao pesquisar posts no BFF:', error);
    throw error;
  }
}

export async function excluirPostBff(userId: string, postId: string): Promise<ResultadoOperacao> {
  try {
    const response = await fetch(`${BASE_URL}/posts/${userId}/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: ResultadoOperacao = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    console.error('Erro ao excluir post no BFF:', error);
    throw error;
  }
}
