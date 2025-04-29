"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastrarUsuario = cadastrarUsuario;
exports.fazerLogin = fazerLogin;
var firebaseConfig_1 = require("../firebase/firebaseConfig");
var auth_1 = require("firebase/auth");
var usuarioServico_1 = require("../usuarios/usuarioServico");
var errosAutenticacao_1 = require("./errosAutenticacao");
function cadastrarUsuario(nome, email, senha, confirmarSenha) {
    return __awaiter(this, void 0, void 0, function () {
        var usuarioCred, erro_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!nome || !email || !senha || !confirmarSenha) {
                        return [2 /*return*/, { sucesso: false, mensagem: "Todos os campos são obrigatórios." }];
                    }
                    if (senha !== confirmarSenha) {
                        return [2 /*return*/, { sucesso: false, mensagem: "As senhas não coincidem." }];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, auth_1.createUserWithEmailAndPassword)(firebaseConfig_1.auth, email, senha)];
                case 2:
                    usuarioCred = _a.sent();
                    return [4 /*yield*/, (0, usuarioServico_1.salvarUsuario)(usuarioCred.user.uid, nome, email)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, { sucesso: true, mensagem: "Usuário cadastrado com sucesso." }];
                case 4:
                    erro_1 = _a.sent();
                    return [2 /*return*/, { sucesso: false, mensagem: (0, errosAutenticacao_1.traduzirErroFirebase)(erro_1.code) }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function fazerLogin(email, senha, lembrarDeMim) {
    return __awaiter(this, void 0, void 0, function () {
        var erro_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!email || !senha) {
                        return [2 /*return*/, { sucesso: false, mensagem: "Email e senha são obrigatórios." }];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, auth_1.setPersistence)(firebaseConfig_1.auth, lembrarDeMim ? auth_1.browserLocalPersistence : auth_1.browserSessionPersistence)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, auth_1.signInWithEmailAndPassword)(firebaseConfig_1.auth, email, senha)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, { sucesso: true, mensagem: "Login realizado com sucesso." }];
                case 4:
                    erro_2 = _a.sent();
                    return [2 /*return*/, { sucesso: false, mensagem: (0, errosAutenticacao_1.traduzirErroFirebase)(erro_2.code) }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
