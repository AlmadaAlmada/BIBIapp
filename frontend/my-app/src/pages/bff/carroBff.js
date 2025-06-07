const BASE_URL = 'http://10.0.2.2:3100/api';

export async function cadastrarCarro(nome, marca, modelo, ano, mediaKmSemana) {
    const usuario = auth.currentUser;

    if (!usuario) {
        throw { sucesso: false, mensagem: 'Usuário não autenticado.' };
    }

    const uidUsuario = usuario.uid;

    try {
        const response = await fetch(`${BASE_URL}/cadastroCarro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                //uidUsuario,
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

        return data;
    } catch (error) {
        console.error('Erro ao cadastrar carro:', error);
        throw error;
    }
}


export async function buscarCarros() {
    try{
        const resposta = await fetch(`${BASE_URL}/obterMarcasModelo`);
        return await resposta.json();
    }catch(error){}
}