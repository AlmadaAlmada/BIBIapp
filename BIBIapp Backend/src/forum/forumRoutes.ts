import { Router } from "express";
import * as forumController from "./forumController";

const router = Router();

router.post("/posts", forumController.criarPost);
router.get("/posts", forumController.listarPosts);
router.post("/posts/:postId/comments", forumController.comentar);
router.get("/posts/:postId/comments", forumController.listarComentarios);
router.delete("/posts/:postId", forumController.excluirPost);
router.delete("/posts/:postId/comments/:commentId", forumController.excluirComentario);

export default router;