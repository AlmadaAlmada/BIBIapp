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

            console.log(resultado.mensagem);

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
                <Title title="Create an account"></Title>
            </View>
            <View style={style.boxMid}>
                <Input placeholder="Full Name"
                    value={nome}
                    onChangeText={setNome}></Input>
                <Input
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none" placeholder="email@domain.com"></Input>
                <Input placeholder="password"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry></Input>
                <Input
                    placeholder="confirm password"
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    secureTextEntry></Input>
                <View style={style.boxButton}>
                    <TouchableOpacity style={style.button}
                        onPress={handleCadastroAPI}

                    >
                        <Text style={style.criar}>Concluído</Text>
                    </TouchableOpacity>
                </View>
                <Or></Or>
            </View>

            <View style={style.boxBottom}>
                <Google></Google>
                <View style={style.boxTermo}>
                    <Text style={style.termo}> By clicking continue, you agree to our Terms of Service</Text>
                    <Text style={style.termo}>                                  and Privacy Policy</Text>
                </View>
            </View>
        </View>
    );
}
