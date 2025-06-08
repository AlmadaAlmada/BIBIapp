const BASE_URL = 'http://10.0.2.2:3100/api';

interface ResultadoCadastro {
  sucesso: boolean;
  mensagem: string;
}

interface ResultadoBusca {
  sucesso: boolean;
  marcas: string[];
  modelos: {
    [marca: string]: string[];
  };
}

// export async function cadastrarCarro(
//   nome: string,
//   marca: string,
//   modelo: string,
//   ano: string,
//   mediaKmSemana: string
// ): Promise<ResultadoCadastro> {
  //const usuario = auth.currentUser;

//   if (!usuario) {
//     throw { sucesso: false, mensagem: 'Usuário não autenticado.' };
//   }

  // const uidUsuario = usuario.uid; // caso você use no futuro

//   try {
//     const response = await fetch(`${BASE_URL}/cadastroCarro`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         nome,
//         marca,
//         modelo,
//         ano,
//         mediaKmSemana,
//       }),
//     });

//     const data: ResultadoCadastro = await response.json();

//     if (!response.ok) {
//       throw data;
//     }

//     return data;
//   } catch (error) {
//     console.error('Erro ao cadastrar carro:', error);
//     throw error;
//   }


export async function buscarCarros(): Promise<ResultadoBusca> {
  try {
    const response = await fetch(`${BASE_URL}/obterMarcasModelo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: ResultadoBusca = await response.json();

    if (!response.ok) {
      throw data;
    }

    console.log("xique xique -> " + response);
    console.log('Resposta da API de marcas e modelos:', data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar marcas e modelos:', error);
    throw error;
  }
}
