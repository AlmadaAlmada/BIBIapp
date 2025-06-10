import React, { useState } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';

import { style } from "./style";

import Logo from '../../assets/logoGoogle.png'
import Camera from '../../assets/camera.png'
import Teste from '../../assets/teste.png'
import Plus from '../../assets/plus.png'

import Profile2 from '../../assets/profile2.png'
import { Input } from "../../components/Input";
import { Google } from "../../components/Google";
import { Title } from "../../components/Title";
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { PostCard } from "../../components/PostCard";
import { Header } from "../../components/Header";
import { BuscaTopo } from "../../components/BuscaTopo";
import { alteraConta } from "../bff/userBff";


export default function AlteraConta() {
    const navigation = useNavigation<NavigationProp<any>>();

    const [emailAntigo, setEmailAntigo] = useState('');
    const [senhaAntiga, setSenhaAntiga] = useState('');
    const [emailNovo, setEmailNovo] = useState('');
    const [senhaNova, setSenhaNova] = useState('');

    const handleAlteraConta = async () => {

        if (!emailAntigo || !senhaAntiga) {
            Alert.alert('Erro', 'Por favor, preencha o email e a senha atuais.');
            return;
        }

        if (!emailNovo && !senhaNova) {
            Alert.alert('Erro', 'Por favor, preencha o novo email ou a nova senha para realizar a alteração.');
            return;
        }

        if (emailNovo === emailAntigo && senhaNova === senhaAntiga) {
            Alert.alert('Atenção', 'O novo email e a nova senha são iguais aos atuais. Nenhuma alteração será feita.');
            return;
        }

        try {
            const resultado = await alteraConta(emailAntigo, senhaAntiga, emailNovo, senhaNova);

            if (resultado.sucesso) {
                Alert.alert('Sucesso', resultado.mensagem);
                navigation.goBack();
            } else {

                Alert.alert('Erro', resultado.mensagem || 'Ocorreu um erro desconhecido ao alterar a conta.');
            }
        } catch (erro) {
            console.error('Erro ao alterar conta:', erro);
            return {
                sucesso: false,
                mensagem: 'Erro ao conectar com o servidor.'
            };
        }
    };

    return (
        <SafeAreaView style={style.container}>
            <View style={style.BoxTop}>
                <Header title='Alterar Conta' />
            </View>
            <View style={style.BoxMid}>
                <View>
                    {/* Email Antigo */}
                    <View style={style.inputGroup}>
                        <Text style={style.inputLabel}>Digite seu Email antigo:</Text>
                        <Input
                            placeholder="email@domain.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={emailAntigo}
                            onChangeText={setEmailAntigo}
                        ></Input>
                    </View>

                    {/* Senha Antiga */}
                    <View style={style.inputGroup}>
                        <Text style={style.inputLabel}> Digite sua senha antiga:</Text>
                        <Input
                            placeholder="password"
                            value={senhaAntiga}
                            onChangeText={setSenhaAntiga}
                            secureTextEntry
                        ></Input>
                    </View>

                    {/* Email Novo */}
                    <View style={style.inputGroup}>
                        <Text style={style.inputLabel}>Digite seu Novo Email:</Text>
                        <Input
                            placeholder="email@domain.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={emailNovo}
                            onChangeText={setEmailNovo}
                        ></Input>
                    </View>

                    {/* Nova Senha */}
                    <View style={style.inputGroup}>
                        <Text style={style.inputLabel}>Confirmar Senha:</Text>
                        <Input
                            placeholder="confirm password"
                            value={senhaNova}
                            onChangeText={setSenhaNova}
                            secureTextEntry></Input>
                    </View>
                    <View style={style.boxButton}>
                        <TouchableOpacity style={style.button} onPress={handleAlteraConta} >
                            <Text style={style.criar}>Concluído</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}