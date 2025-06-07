import { Router } from 'express';
import userController from '../controllers/userController';
import carroController from '../controllers/carroController';

const route = Router();

// Rotas de usuário
route.post('/cadastroUser', userController.criarUsuario);
route.post('/loginUser', userController.loginUsuario);

// Rotas de carro
route.post('/criarCarro', carroController.criarCarro);
route.get('/obterMarcasModelo', carroController.obterMarcasModelo);

// ROtas de Alerta

export default route;
