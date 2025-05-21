"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarPost = criarPost;
exports.listarPosts = listarPosts;
exports.comentar = comentar;
exports.excluirPost = excluirPost;
exports.excluirComentario = excluirComentario;
exports.listarComentarios = listarComentarios;
const forumService = __importStar(require("./forumService"));
async function criarPost(req, res) {
    try {
        const post = await forumService.criarPost(req.body);
        res.status(201).json(post);
    }
    catch (e) {
        res.status(500).json({ erro: "Erro ao criar post." });
    }
}
async function listarPosts(req, res) {
    try {
        const posts = await forumService.listarPosts(req.query.search);
        res.json(posts);
    }
    catch (e) {
        res.status(500).json({ erro: "Erro ao listar posts." });
    }
}
async function comentar(req, res) {
    try {
        const { postId } = req.params;
        const comment = await forumService.comentar(postId, req.body);
        res.status(201).json(comment);
    }
    catch (e) {
        res.status(500).json({ erro: "Erro ao comentar." });
    }
}
async function excluirPost(req, res) {
    try {
        const { postId } = req.params;
        await forumService.excluirPost(postId);
        res.status(204).send();
    }
    catch (e) {
        res.status(500).json({ erro: "Erro ao excluir post." });
    }
}
async function excluirComentario(req, res) {
    try {
        const { postId, commentId } = req.params;
        await forumService.excluirComentario(postId, commentId);
        res.status(204).send();
    }
    catch (e) {
        res.status(500).json({ erro: "Erro ao excluir comentário." });
    }
}
async function listarComentarios(req, res) {
    try {
        const { postId } = req.params;
        const comments = await forumService.listarComentarios(postId);
        res.json(comments);
    }
    catch (e) {
        res.status(500).json({ erro: "Erro ao listar comentários." });
    }
}
