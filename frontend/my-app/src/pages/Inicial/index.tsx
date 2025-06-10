import React, { useEffect, useState } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';

import { style } from "./styles";

import Ok from '../../assets/ok.png'
import Recomendada from '../../assets/recomendada.png'
import Necessaria from '../../assets/necessaria.png'
import Foto from '../../assets/1.png'
import Logo3 from '../../assets/fiat2.png'
import Bola from '../../assets/bola.png'
import Teste from '../../assets/teste.png'
import { Card } from "../../components/Card";
import { Dimensions, Platform } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { buscarDadosCarroBff } from "../bff/carroBff";
import { listarAlertasComStatusBff } from "../bff/alertaBff";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useAlertas } from "../AlertaContext";


const { width, height } = Dimensions.get('window');

const imagensCarros: Record<string, any> = {
    "BIBIapp Backendimagenshilux.png": require('../../assets/hilux.png'),
    "BIBIapp Backendimagenscorolla.png": require('../../assets/corolla.png'),
};


export default function Inicial() {

    const { alertas } = useAlertas();

    const [carroImage, setCarroImage] = useState('');

    const [idCarro, setidCarro] = useState<string | null>(null);



    useFocusEffect(
        useCallback(() => {
            const buscaridCarro = async () => {
                const idCarroSalvo = await AsyncStorage.getItem('idCarro');
                setidCarro(idCarroSalvo);
                console.log("CADE O ID DO CARRO NA TELA INICIAL??", idCarroSalvo);
            };

            buscaridCarro();
        }, [])
    );


    const [uid, setUid] = useState<string | null>(null);


    useFocusEffect(
        useCallback(() => {
            const buscarUid = async () => {
                const uidSalvo = await AsyncStorage.getItem('uid');
                setUid(uidSalvo);
                console.log("CADE O ID DO USUARIO NA TELA INICIAL?", uidSalvo);
            };

            buscarUid();
        }, [])
    );

    useEffect(() => {


        const buscarDadosCarro = async () => {
            try {
                const resposta = await buscarDadosCarroBff(uid!);


                let imagemUrl = resposta.carros[0]?.imagemUrl;

                if (imagensCarros[imagemUrl]) {
                    setCarroImage(imagensCarros[imagemUrl]);
                } else {
                    console.warn("Imagem não encontrada:", imagemUrl);
                }

                if (resposta.sucesso) {
                    console.log("Dados do carro:", resposta.carros);
                } else {
                    Alert.alert('Erro', resposta.mensagem);
                }
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível salvar o carro')
            }
        }

        buscarDadosCarro();
    }, [uid]);



    useEffect(() => {
        if (!uid || !idCarro) return;

        const listarAlertasComStatus = async () => {
            try {
                console.log("Resposta dos cards do alerta com status:");
                console.log(alertas);

                alertas.forEach((a, i) => {
                    console.log(`Alerta ${i + 1}`);
                    console.log(`Peça: ${a.peca}`);
                    console.log(`Última troca: ${a.dataUltimaTroca}`);
                    console.log(`Status: ${a.status}`);
                    console.log(`KM restante: ${a.kmRestante}`);
                    console.log(`Meses restantes: ${a.mesesRestantes}`);
                });
            } catch (error) {
                Alert.alert('Erro', 'erro ao puxar dados');
            }
        };

        listarAlertasComStatus();
    }, [uid, idCarro, alertas]);


    function formatarData(data: string): string {
        const objData = new Date(data);
        if (isNaN(objData.getTime())) return "Data inválida";
        return objData.toISOString().split("T")[0];
    }

    function getImagemStatus(status: string) {
        if (status === "ok") return Ok;
        if (status === "recomendada") return Recomendada;
        if (status === "necessaria") return Necessaria;
        return "Logo";
    }


    return (
        <SafeAreaView style={style.container}>
            <View style={style.boxTop}>
                <Image style={style.foto}
                    source={carroImage || Foto}></Image>
                <View style={style.boxCores}>
                    <Text style={style.linhas}> ────────────────  </Text>
                    <Image style={style.logo3}
                        source={Logo3}>
                    </Image>
                    <Image style={style.bola}
                        source={Bola}></Image>
                    <Text style={style.linhas}>  ─────────────────</Text>
                </View>
            </View>
            <View style={style.boxMid}>
                <ScrollView style={style.scroll}>

                    <View style={style.formata}>
                        {alertas.map((alerta, index) => (
                            <View style={style.formata} key={index}>
                                <Card
                                    imageLeft={Bola}
                                    title={alerta.peca}
                                    subtitle={`Próxima troca: ${alerta.mesesRestantes} meses`}
                                    subtitle2={`Última troca: ${formatarData(alerta.dataUltimaTroca)}`}
                                    imageRight={getImagemStatus(alerta.status)}
                                    bottomText={alerta.status}
                                />
                            </View>
                        ))}


                    </View>
                </ScrollView>

            </View>


        </SafeAreaView>
    );
}
