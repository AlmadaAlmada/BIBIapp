import { Request, Response } from 'express';
import { cadastrarCarro, buscarMarcasModelos, buscarCarrosPorUsuario} from '../carros/carroServico';



export const criarCarro = async (req: Request, res: Response) => {
    const { uidUsuario, nome, marca, modelo, ano, mediaKmSemana } = req.body;

    try {
        if (!uidUsuario || !nome || !marca || !modelo || !ano || !mediaKmSemana) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
        }

        const dadosCarro = { nome, marca, modelo, ano, mediaKmSemana };
        const resultado = await cadastrarCarro(uidUsuario, dadosCarro);

        if (resultado.sucesso) {
            return res.status(201).json(resultado);
        } else {
            return res.status(400).json({ mensagem: resultado.mensagem });
        }

    } catch (error: any) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor', erro: error.message });
    }
}

export const obterCarrosPorUsuario = async (req: Request, res: Response) => {
  const { uidUsuario } = req.params;


  if (!uidUsuario) {
    return res.status(400).json({ sucesso: false, mensagem: "Parâmetro uidUsuario é obrigatório." });
  }

  try {
    const resultado = await buscarCarrosPorUsuario(uidUsuario);
    if (resultado.sucesso) {
      return res.status(200).json(resultado);
    } else {
      return res.status(500).json({ sucesso: false, mensagem: resultado.mensagem });
    }
  } catch (error: any) {
    return res.status(500).json({ sucesso: false, mensagem: "Erro interno do servidor.", erro: error.message });
  }
};

export const obterMarcasModelo = async(req: Request, res: Response) => {
    const resultado = buscarMarcasModelos();
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
    obterCarrosPorUsuario,
}