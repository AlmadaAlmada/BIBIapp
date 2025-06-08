import { Router } from 'express';
import userController from '../controllers/userController';
import carroController from '../controllers/carroController';
import alertaController from '../controllers/alertaController'; 
const route = Router();

// Rotas de usuário
route.post('/cadastroUser', userController.criarUsuario);
route.post('/loginUser', userController.loginUsuario);
route.post('/logoutUser', userController.logoutUsuario);

// Rotas de carro
route.post('/cadastroCarro', carroController.criarCarro);
route.get('/obterMarcasModelo', carroController.obterMarcasModelo);
route.get('/carros/:uidUsuario', carroController.obterCarrosPorUsuario);
//route.get('/carros/:uidUsuario', carroController.obterCarrosPorUsuario);

// Rotas de Alerta
route.post('/alertas', alertaController.criarAlerta);
route.put('/alertas', alertaController.atualizarDataAlerta); 
route.get('/alertas/:uidUsuario/:carroId/:alertaId/status', alertaController.obterStatusAlerta);
route.get('/alertas/pecas-disponiveis', alertaController.obterPecasDisponiveis);
route.get('/alertas/:uidUsuario/:carroId', alertaController.listarAlertasDoCarro); 
route.get('/alertas/:uidUsuario/:carroId/:alertaId', alertaController.obterAlertaPorId); 
route.delete('/alertas/:uidUsuario/:carroId/:alertaId', alertaController.removerAlerta);
route.get('/alertas/:uidUsuario/:carroId/:alertaId/status', alertaController.obterStatusAlerta);


export default route;
