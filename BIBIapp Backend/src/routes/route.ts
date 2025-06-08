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


// Rotas de Alerta - ORDEM CORRIGIDA
route.post('/alertas', alertaController.criarAlerta);
route.put('/alertas', alertaController.atualizarDataAlerta); 
route.get('/alertas/pecas-disponiveis', alertaController.obterPecasDisponiveis);

// Rotas mais específicas DEVEM vir ANTES das mais genéricas
route.get('/alertas/status/:uidUsuario/:carroId', alertaController.listarAlertasComStatus);
route.get('/alertas/:uidUsuario/:carroId/:alertaId/status', alertaController.obterStatusAlerta);
route.get('/alertas/:uidUsuario/:carroId/:alertaId', alertaController.obterAlertaPorId); 
route.get('/alertas/:uidUsuario/:carroId', alertaController.listarAlertasDoCarro); 

route.delete('/alertas/:uidUsuario/:carroId/:alertaId', alertaController.removerAlerta);

export default route;