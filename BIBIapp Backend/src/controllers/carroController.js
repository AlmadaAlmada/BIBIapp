//const { cadastrarCarro } = require('../../src/carros/carroServico');
//import { auth } from '../firebase/firebaseConfig.ts';
import { cadastrarCarro } from '../carros/carroServico.ts';

module.exports = {
    async criarCarro(req, res) {
        try {
            //uidUsuario = auth.currentUser;
            
            const { uidUsuario, nome, marca, modelo, ano, mediaKmSemana } = req.body;

            // Validação rápida no controller (opcional, já existe no service)
            if (!uidUsuario || !nome || !marca || !modelo || !ano || !mediaKmSemana) {
                return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
            }

            const dadosCarro = { nome, marca, modelo, ano, mediaKmSemana };

            const resultado = await cadastrarCarro(uidUsuario, dadosCarro);

            if (resultado.sucesso) {
                return res.status(201).json({ mensagem: resultado.mensagem });
            } else {
                return res.status(400).json({ mensagem: resultado.mensagem });
            }

        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro interno do servidor', erro: error.message });
        }
    }
};
