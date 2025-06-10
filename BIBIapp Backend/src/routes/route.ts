import { Router } from 'express';
import userController from '../controllers/userController';
import carroController from '../controllers/carroController';
import alertaController from '../controllers/alertaController';
import forumController from '../controllers/forumController';

const route = Router();

// Rotas de usuário
route.post('/cadastroUser', userController.criarUsuario);
route.post('/loginUser', userController.loginUsuario);
route.post('/logoutUser', userController.logoutUsuario);
route.put('/atualizarUser', userController.atualizarUsuario);

// Rotas de carro
route.post('/cadastroCarro', carroController.criarCarro);
route.get('/obterMarcasModelo', carroController.obterMarcasModelo);
route.get('/carros/:uidUsuario', carroController.obterCarrosPorUsuario);

route.post('/alertas', alertaController.criarAlerta);
route.put('/alertas', alertaController.atualizarDataAlerta);
route.get('/alertas/pecas-disponiveis', alertaController.obterPecasDisponiveis);
route.get('/alertas/status/:uidUsuario/:carroId', alertaController.listarAlertasComStatus);
route.get('/alertas/:uidUsuario/:carroId/:alertaId/status', alertaController.obterStatusAlerta);
route.get('/alertas/:uidUsuario/:carroId/:alertaId', alertaController.obterAlertaPorId);
route.get('/alertas/:uidUsuario/:carroId', alertaController.listarAlertasDoCarro);
route.delete('/alertas/:uidUsuario/:carroId/:alertaId', alertaController.removerAlerta);

// Rotas do Fórum
route.post('/posts', forumController.criarPost);
route.get('/posts/all', forumController.listarTodosPosts);
route.get('/posts/search', forumController.pesquisarPosts);
route.get('/posts/:userId', forumController.listarPosts);
route.delete('/posts/:userId/:postId', forumController.excluirPost);

export default route;
