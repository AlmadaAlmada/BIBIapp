//const { cadastrarCarro } = require('../../src/carros/carroServico');
//import { auth } from '../firebase/firebaseConfig.ts';
import { Request, Response } from 'express';
import { cadastrarCarro, buscarCarros } from '../carros/carroServico';


export const criarCarro = async (req: Request, res: Response) => {
    const { uidUsuario, nome, marca, modelo, ano, mediaKmSemana } = req.body;

    try {
        // Validação rápida no controller (opcional, já existe no service)
        if (!uidUsuario || !nome || !marca || !modelo || !ano || !mediaKmSemana) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
        }

        const dadosCarro = { nome, marca, modelo, ano, mediaKmSemana };
        const resultado = await cadastrarCarro(uidUsuario, dadosCarro);

        if (resultado.sucesso) {
            return res.status(201).json({ mensagem: resultado.mensagem });
        } else {
            return res.status(400).json({ mensagem: resultado.mensagem });
        }

    } catch (error: any) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor', erro: error.message });
    }
}

export const obterMarcasModelo = async(req: Request, res: Response) => {
    const resultado = buscarCarros();
    if(resultado.sucesso){
        return res.status(200).json({
        sucesso: true,
        marcas: resultado.marcas,
        modelos: resultado.modelos, 
      });
    }
}

export default{
    criarCarro,
    obterMarcasModelo,
}