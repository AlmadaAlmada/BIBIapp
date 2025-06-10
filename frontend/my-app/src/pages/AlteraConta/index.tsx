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

export default function AlteraConta() {
    const navigation = useNavigation<NavigationProp<any>>();

    return (
        <SafeAreaView style={style.container}>
            <View style = {style.BoxTop}>
                <Header title='Alterar Conta' />
            </View>
            <View style = {style.BoxMid}>
                <View>
                    {/* Email Antigo */}
                    <View style={style.inputGroup}>
                        <Text style={style.inputLabel}>Digite seu Email atual:</Text>
                        <Input
                            placeholder="email@domain.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        // value={emailAntigo}
                        //</View>onChangeText={emailAntigo}
                        ></Input>
                    </View>

                    {/* Senha Antiga */}
                    <View style={style.inputGroup}>
                        <Text style={style.inputLabel}> Digite sua senha antiga:</Text>
                        <Input
                            placeholder="password"
                            //value={senhaAntiga}
                            //onChangeText={senhaAntiga}
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
                        //value={novoEmail}
                        //onChangeText={novaSenha}
                        ></Input>
                    </View>

                    {/* Nova Senha */}
                    <View style={style.inputGroup}>
                        <Text style={style.inputLabel}>Confirmar Senha:</Text>
                        <Input
                            placeholder="confirm password"
                            //value={novaSenha}
                            //onChangeText={novaSenha}
                            secureTextEntry></Input>
                    </View>
                    <View style={style.boxButton}>
                        <TouchableOpacity style={style.button}
                        //onPress={alterarConta}
                        >
                            <Text style={style.criar}>Concluído</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}