import { Request, Response } from 'express';
import { cadastrarUsuario, fazerLogin, fazerLogout, ResultadoLogout } from '../autenticacao/autenticacaoServico';
import { getIdToken, getIdTokenResult } from 'firebase/auth';

interface ResultadoLogin {
  sucesso: boolean;
  mensagem: string;
  token?: string;
  uid?: string;
}

interface ResultadoCadastro {
  sucesso: boolean;
  mensagem: string;
}

const criarUsuario = async (req: Request, res: Response) => {
  const { nome, email, senha, confirmarSenha } = req.body;

  if (!nome || !email || !senha || !confirmarSenha) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Todos os campos são obrigatórios.',
    });
  }

  try {
    const resultado: ResultadoCadastro = await cadastrarUsuario(nome, email, senha, confirmarSenha);

    return res.status(resultado.sucesso ? 201 : 400).json(resultado);
  } catch (error) {
    console.error('Erro no controller de cadastro:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor.',
    });
  }
};

const loginUsuario = async (req: Request, res: Response) => {
  const { email, senha, lembrarDeMim } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Email e senha são obrigatórios.',
    });
  }

  try {
    const resultado: ResultadoLogin = await fazerLogin(email, senha, lembrarDeMim);
    

    if (resultado.sucesso) {
      return res.status(200).json({
        sucesso: true,
        mensagem: resultado.mensagem,
        token: resultado.token, 
        uid: resultado.uid, 
      });
    } else {
      return res.status(400).json(resultado);
    }
  } catch (error) {
    console.error('Erro no controller de login:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor.',
    });
  }
};

const logoutUsuario = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'Token de autenticação não fornecido.',
      });
    }

    const token = authHeader.replace('Bearer ', '');
    
    const resultado: ResultadoLogout = await fazerLogout(token);

    return res.status(resultado.sucesso ? 200 : 400).json(resultado);
  } catch (error) {
    console.error('Erro no controller de logout:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor.',
    });
  }
};

export default {
  criarUsuario,
  loginUsuario,
  logoutUsuario,
};
