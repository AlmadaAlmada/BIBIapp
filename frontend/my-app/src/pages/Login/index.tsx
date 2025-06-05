import React, { useState } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert } from 'react-native';

import { style } from "./styles";

import Logo from '../../assets/logoGoogle.png'

import Logo2 from '../../assets/logoApple.png'
import { Input } from "../../components/Input";
import { Or } from "../../components/Or";
import { Google } from "../../components/Google";
import { Title } from "../../components/Title";
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { loginUsuario } from "../services/userService";



export default function Login() {

    const navigation = useNavigation<NavigationProp<any>>();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

const handleLoginAPI = async () => {
    if (!email || !senha) {
        Alert.alert("Atenção", "Por favor, preencha todos os campos.");
        return;
    }

    try {
        const resultado = await loginUsuario(email, senha);

        console.log(resultado.mensagem);

        if (resultado.sucesso) {
            Alert.alert('Sucesso', resultado.mensagem, [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('BottomRoutes') // 🔥 Redireciona para a Home
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
                <Title title="Login"></Title>
            </View>
            <View style={style.boxMid}>
                <Input placeholder="email@domain.com"
                    value={email}
                    onChangeText={setEmail}
                    backgroundColor=""
                >
                </Input>
                <Input placeholder="password"
                    value={senha}
                    onChangeText={setSenha}
                    backgroundColor=""
                >
                </Input>
                <View style={style.boxButton}>
                    <TouchableOpacity style={style.button} onPress={handleLoginAPI}>
                        <Text style={style.criar}>Concluído</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button2} onPress={()=> navigation.navigate("Cadastro") }>
                        <View>
                            <Text style={style.criar2}>Criar conta</Text>
                        </View>
                        
                    </TouchableOpacity>
                </View>
                <Or></Or>
            </View>

            <View style={style.boxBottom}>
                <Google></Google>

            </View>
        </View>
    );
}
