import React, { useState } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert } from 'react-native';

import { style } from "./styles";

import Logo from '../../assets/logoGoogle.png'

import Logo2 from '../../assets/logoApple.png'
import { Input } from "../../components/Input";
import { Or } from "../../components/Or";
import { Google } from "../../components/Google";
import { Title } from "../../components/Title";
import { NavigationProp, useNavigation } from "@react-navigation/core";
import { cadastrarUsuario } from "../bff/userBff";
import back from "../../assets/backAzul.png"

export default function Cadastro() {

    const navigation = useNavigation<NavigationProp<any>>();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');


    const handleCadastroAPI = async () => {
        if (!nome || !email || !senha || !confirmarSenha) {
            Alert.alert("Atenção", "Por favor, preencha todos os campos.");
            return;
        }
        if (senha !== confirmarSenha) {
            Alert.alert("Atenção", "As senhas não coincidem.");
            return;
        }

        try {
            const resultado = await cadastrarUsuario(nome, email, senha, confirmarSenha);

            if (resultado.sucesso) {
                Alert.alert('Sucesso', resultado.mensagem, [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('Login')  // ← redireciona para a Home
                    }
                ]);
            } else {
                Alert.alert('Erro', resultado.mensagem);
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro inesperado');
        }
    };


    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <View style={style.buttonTitle}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={back} style={style.backIcon} />
                    </TouchableOpacity>

                    <Text style={style.appTitle}>BIBI app</Text>
                </View>

                <Text style={style.pageSubtitle}>Criar uma conta</Text>
            </View>
            <View style={style.boxMid}>
                {/* Grupo para Nome */}
                <View style={style.inputGroup}>
                    <Text style={style.inputLabel}>Nome:</Text>
                    <Input

                        placeholder="Full Name"
                        value={nome}
                        onChangeText={setNome}></Input>
                </View>

                {/* Grupo para Email */}
                <View style={style.inputGroup}>
                    <Text style={style.inputLabel}>Email:</Text>
                    <Input
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none" placeholder="email@domain.com"></Input>
                </View>

                {/* Grupo para Senha */}
                <View style={style.inputGroup}>
                    <Text style={style.inputLabel}>Senha:</Text>
                    <Input 

                        placeholder="password"
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry></Input>
                </View>

                {/* Grupo para Confirmar Senha */}
                <View style={style.inputGroup}>
                    <Text style={style.inputLabel}>Confirmar Senha:</Text>
                    <Input
                        placeholder="confirm password"
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                        secureTextEntry></Input>
                </View>

                <View style={style.boxButton}>
                    <TouchableOpacity style={style.button}
                        onPress={handleCadastroAPI}
                    >
                        <Text style={style.criar}>Concluído</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={style.boxBottom}>
                <View style={style.boxTermo}>
                    <Text style={style.termo}> By clicking continue, you agree to our Terms of Service</Text>
                    <Text style={style.termo}>                                  and Privacy Policy</Text>
                </View>
            </View>
        </View>
    );
}
