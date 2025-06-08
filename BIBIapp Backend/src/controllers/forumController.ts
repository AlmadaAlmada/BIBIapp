import { Request, Response } from 'express';
import * as forumService from "../forum/forumServico";

interface ResultadoPost {
  sucesso: boolean;
  mensagem: string;
  post?: any;
}

interface ResultadoComentario {
  sucesso: boolean;
  mensagem: string;
  comentario?: any;
}

interface ResultadoListagem {
  sucesso: boolean;
  mensagem: string;
  dados?: any[];
}

interface ResultadoOperacao {
  sucesso: boolean;
  mensagem: string;
}

const criarPost = async (req: Request, res: Response) => {
  const { autorId, autorNome, texto } = req.body;

  if (!autorId || !autorNome || !texto) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Todos os campos são obrigatórios.',
    });
  }

  try {
    const resultado: ResultadoPost = await forumService.criarPost({ autorId, autorNome, texto });

    return res.status(resultado.sucesso ? 201 : 400).json(resultado);
  } catch (error) {
    console.error('Erro no controller de criar post:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor.',
    });
  }
};

const listarPosts = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const busca = req.query.search as string;

  if (!userId) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'ID do usuário é obrigatório para listar posts.',
    });
  }

  try {
    const resultado: ResultadoListagem = await forumService.listarPosts(userId, busca);

    return res.status(resultado.sucesso ? 200 : 400).json(resultado);
  } catch (error) {
    console.error('Erro no controller de listar posts:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor.',
    });
  }
};

const listarTodosPosts = async (req: Request, res: Response) => {
  try {
    const resultado: ResultadoListagem = await forumService.listarTodosPosts();

    return res.status(resultado.sucesso ? 200 : 400).json(resultado);
  } catch (error) {
    console.error('Erro no controller de listar todos os posts:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor.',
    });
  }
};

const comentar = async (req: Request, res: Response) => {
  const { postAutorId, postId } = req.params;
  const { autorId, autorNome, texto } = req.body;

  if (!postAutorId || !postId || !autorId || !autorNome || !texto) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Todos os campos (incluindo IDs de post e autor) são obrigatórios para comentar.',
    });
  }

  try {
    const resultado: ResultadoComentario = await forumService.comentar(postAutorId, postId, { autorId, autorNome, texto });

    return res.status(resultado.sucesso ? 201 : 400).json(resultado);
  } catch (error) {
    console.error('Erro no controller de comentar:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor.',
    });
  }
};

const listarComentarios = async (req: Request, res: Response) => {
  const { postAutorId, postId } = req.params;

  if (!postAutorId || !postId) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'ID do autor do post e ID do post são obrigatórios para listar comentários.',
    });
  }

  try {
    const resultado: ResultadoListagem = await forumService.listarComentarios(postAutorId, postId);

    return res.status(resultado.sucesso ? 200 : 400).json(resultado);
  } catch (error) {
    console.error('Erro no controller de listar comentários:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor.',
    });
  }
};

const excluirPost = async (req: Request, res: Response) => {
  const { userId, postId } = req.params;
  if (!userId || !postId) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'ID do usuário e ID do post são obrigatórios para excluir post.',
    });
  }

  try {
    const resultado: ResultadoOperacao = await forumService.excluirPost(userId, postId);

    return res.status(resultado.sucesso ? 200 : 400).json(resultado);
  } catch (error) {
    console.error('Erro no controller de excluir post:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor.',
    });
  }
};

const excluirComentario = async (req: Request, res: Response) => {
  const { postAutorId, postId, commentId } = req.params;

  if (!postAutorId || !postId || !commentId) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'ID do autor do post, ID do post e ID do comentário são obrigatórios para excluir comentário.',
    });
  }

  try {
    const resultado: ResultadoOperacao = await forumService.excluirComentario(postAutorId, postId, commentId);

    return res.status(resultado.sucesso ? 200 : 400).json(resultado);
  } catch (error) {
    console.error('Erro no controller de excluir comentário:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor.',
    });
  }
};

const pesquisarPosts = async (req: Request, res: Response) => {
  const busca = req.query.search as string;

  if (!busca) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'O termo de busca é obrigatório.',
    });
  }

  try {
    const resultado: ResultadoListagem = await forumService.pesquisarPostsPorPalavraChave(busca);

    return res.status(resultado.sucesso ? 200 : 400).json(resultado);
  } catch (error) {
    console.error('Erro no controller de pesquisa de posts:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor.',
    });
  }
};

export default {
  criarPost,
  listarPosts,
  comentar,
  listarComentarios,
  excluirPost,
  excluirComentario,
  listarTodosPosts,
  pesquisarPosts,
};
