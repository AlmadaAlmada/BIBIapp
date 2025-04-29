import * as forumService from "./forumService";
import { Request, Response } from "express";

export async function criarPost(req: Request, res: Response) {
  try {
    const post = await forumService.criarPost(req.body);
    res.status(201).json(post);
  } catch (e) {
    res.status(500).json({ erro: "Erro ao criar post." });
  }
}

export async function listarPosts(req: Request, res: Response) {
  try {
    const posts = await forumService.listarPosts(req.query.search as string);
    res.json(posts);
  } catch (e) {
    res.status(500).json({ erro: "Erro ao listar posts." });
  }
}

export async function comentar(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    const comment = await forumService.comentar(postId, req.body);
    res.status(201).json(comment);
  } catch (e) {
    res.status(500).json({ erro: "Erro ao comentar." });
  }
}

export async function excluirPost(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    await forumService.excluirPost(postId);
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ erro: "Erro ao excluir post." });
  }
}

export async function excluirComentario(req: Request, res: Response) {
  try {
    const { postId, commentId } = req.params;
    await forumService.excluirComentario(postId, commentId);
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ erro: "Erro ao excluir comentário." });
  }
}

export async function listarComentarios(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    const comments = await forumService.listarComentarios(postId);
    res.json(comments);
  } catch (e) {
    res.status(500).json({ erro: "Erro ao listar comentários." });
  }
}