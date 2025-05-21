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



export default function Login() {

    const navigation = useNavigation<NavigationProp<any>>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function getLogin() {
        try {
            if (!email || !password) {
                return Alert.alert('Atenção', 'Informe os campos obrigatórios!');
            }

            if (email == '1' && password == '1') {
                navigation.navigate("BottomRoutes");
                Alert.alert('Logado com sucesso');
            }
            else {
                Alert.alert('Usuário não encontrado');
            }

            console.log('Logado com sucesso');
        }
        catch (error) {

            console.log('Erro no Login');
        }
    }

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
                    value={password}
                    onChangeText={setPassword}
                    backgroundColor=""
                >
                </Input>
                <View style={style.boxButton}>
                    <TouchableOpacity style={style.button} onPress={getLogin}>
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
