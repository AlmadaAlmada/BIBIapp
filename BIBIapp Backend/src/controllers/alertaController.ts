import { Request, Response } from 'express';
import {
  cadastrarAlerta,
  editarDataAlerta,
  excluirAlerta,
  StatusAlertaPorId,
  PECAS_DISPONIVEIS,
  buscarAlertaPorId,
  listarAlertasPorCarro
} from '../alertas/alertaServico';

interface ResultadoAlerta {
  sucesso: boolean;
  mensagem: string;
}

interface StatusAlerta {
  status: "ok" | "recomendada" | "necessaria";
  kmRestante: number;
  mesesRestantes: number;
}

const criarAlerta = async (req: Request, res: Response) => {
  const { uidUsuario, carroId, peca, dataUltimaTroca } = req.body;

  if (!uidUsuario || !carroId || !peca || !dataUltimaTroca) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Todos os campos são obrigatórios (uidUsuario, carroId, peca, dataUltimaTroca).',
    });
  }

  try {
    const resultado: ResultadoAlerta = await cadastrarAlerta(uidUsuario, carroId, peca, dataUltimaTroca);
    return res.status(resultado.sucesso ? 201 : 400).json(resultado);
  } catch (error) {
    console.error('Erro no controller de criação de alerta:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor ao cadastrar alerta.',
    });
  }
};

const atualizarDataAlerta = async (req: Request, res: Response) => {
  const { uidUsuario, carroId, alertaId, novaDataUltimaTroca } = req.body;

  if (!uidUsuario || !carroId || !alertaId || !novaDataUltimaTroca) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Todos os campos são obrigatórios (uidUsuario, carroId, alertaId, novaDataUltimaTroca).',
    });
  }

  try {
    const resultado: ResultadoAlerta = await editarDataAlerta(uidUsuario, carroId, alertaId, novaDataUltimaTroca);
    return res.status(resultado.sucesso ? 200 : 400).json(resultado);
  } catch (error) {
    console.error('Erro no controller de atualização de alerta:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor ao atualizar alerta.',
    });
  }
};

const removerAlerta = async (req: Request, res: Response) => {
  const { uidUsuario, carroId, alertaId } = req.params; 

  if (!uidUsuario || !carroId || !alertaId) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Todos os parâmetros são obrigatórios (uidUsuario, carroId, alertaId).',
    });
  }

  try {
    const resultado: ResultadoAlerta = await excluirAlerta(uidUsuario, carroId, alertaId);
    return res.status(resultado.sucesso ? 200 : 400).json(resultado);
  } catch (error) {
    console.error('Erro no controller de exclusão de alerta:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor ao excluir alerta.',
    });
  }
};

const obterStatusAlerta = async (req: Request, res: Response) => {
  const { uidUsuario, carroId, alertaId } = req.params; 

  if (!uidUsuario || !carroId || !alertaId) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Todos os parâmetros são obrigatórios (uidUsuario, carroId, alertaId).',
    });
  }

  try {
    const resultado: StatusAlerta | { erro: string } = await StatusAlertaPorId(uidUsuario, carroId, alertaId);

    if ('erro' in resultado) {
      return res.status(404).json({ sucesso: false, mensagem: resultado.erro });
    } else {
      return res.status(200).json({ sucesso: true, ...resultado });
    }
  } catch (error) {
    console.error('Erro no controller ao obter status do alerta:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor ao obter status do alerta.',
    });
  }
};

const obterPecasDisponiveis = (req: Request, res: Response) => {
  try {
    return res.status(200).json({ sucesso: true, pecas: PECAS_DISPONIVEIS });
  } catch (error) {
    console.error('Erro ao obter peças disponíveis:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor ao obter peças disponíveis.',
    });
  }
};

const listarAlertasDoCarro = async (req: Request, res: Response) => {
  const { uidUsuario, carroId } = req.params;

  if (!uidUsuario || !carroId) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'UID do usuário e ID do carro são obrigatórios.',
    });
  }

  try {
    const { sucesso, mensagem, alertas } = await listarAlertasPorCarro(uidUsuario, carroId);
    if (sucesso) {
      return res.status(200).json({ sucesso: true, alertas });
    } else {
      return res.status(404).json({ sucesso: false, mensagem });
    }
  } catch (error) {
    console.error('Erro no controller ao listar alertas:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor ao listar alertas.',
    });
  }
};

const obterAlertaPorId = async (req: Request, res: Response) => {
  const { uidUsuario, carroId, alertaId } = req.params;

  if (!uidUsuario || !carroId || !alertaId) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'UID do usuário, ID do carro e ID do alerta são obrigatórios.',
    });
  }

  try {
    const { sucesso, mensagem, alerta } = await buscarAlertaPorId(uidUsuario, carroId, alertaId);
    if (sucesso) {
      return res.status(200).json({ sucesso: true, alerta });
    } else {
      return res.status(404).json({ sucesso: false, mensagem });
    }
  } catch (error) {
    console.error('Erro no controller ao buscar alerta por ID:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor ao buscar alerta.',
    });
  }
};

const obterStatusAlertaPorId = async (req: Request, res: Response) => {
  const { uidUsuario, carroId, alertaId } = req.params;

  if (!uidUsuario || !carroId || !alertaId) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'UID do usuário, ID do carro e ID do alerta são obrigatórios.',
    });
  }

  try {
    const resultado = await StatusAlertaPorId(uidUsuario, carroId, alertaId);

    if ('erro' in resultado) {
      return res.status(404).json({ sucesso: false, mensagem: resultado.erro });
    }

    return res.status(200).json({ sucesso: true, ...resultado });
  } catch (error) {
    console.error('Erro ao obter status do alerta por ID:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor ao obter status do alerta por ID.',
    });
  }
};


export default {
  criarAlerta,
  atualizarDataAlerta,
  removerAlerta,
  obterStatusAlerta,
  obterPecasDisponiveis,
  listarAlertasDoCarro,
  obterAlertaPorId  
};