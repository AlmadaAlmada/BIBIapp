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
    //9"BIBIapp Backendimagensonix.avif": require('../../assets/Onix.png'),
    "BIBIapp Backendimagenss10.avif": require('../../assets/s10.png')
};


export default function Inicial() {

    const { alertas, setAlertas } = useAlertas();

    const [carroImage, setCarroImage] = useState('');

    const [idCarro, setidCarro] = useState<string | null>(null);



     useFocusEffect(
        useCallback(() => {
            const buscaridCarro = async () => {
                const idCarroSalvo = await AsyncStorage.getItem('idCarro');
                setidCarro(idCarroSalvo);
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
            };

            buscarUid();
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            const buscarDadosCarro = async () => {
                if (!uid) return;

                try {
                    const resposta = await buscarDadosCarroBff(uid);

                    let imagemUrl = resposta.carros[0]?.imagemUrl;

                    if (imagensCarros[imagemUrl]) {
                        setCarroImage(imagensCarros[imagemUrl]);
                    } else {
                        console.warn("Imagem não encontrada:", imagemUrl);
                    }

                    if (resposta.sucesso) {
                    
                    } else {
                        Alert.alert('Erro', resposta.mensagem);
                    }
                } catch (error) {
                    Alert.alert('Erro', 'Não foi possível salvar o carro');
                }
            };

            buscarDadosCarro();
        }, [uid])
    );


    useFocusEffect(
            useCallback(() => {
    
            if (!uid) return;
            if (!idCarro) return;
    
            const listarAlertasComStatus = async () => {
                try {
    
                    const resposta = await listarAlertasComStatusBff(uid!, idCarro!);
    
                    if (resposta.sucesso && Array.isArray(resposta.alertas)) {
                        resposta.alertas.forEach((alerta: { id: any; peca: any; dataUltimaTroca: any; status: any; kmRestante: any; mesesRestantes: any; }, index: number) => {
                     
                        });
    
                        setAlertas(resposta.alertas);
                    }
    
                    if (resposta.sucesso) {
    
    
                    } else {
                        Alert.alert('Erro', resposta.mensagem);
                    }
                } catch (error) {
                    
                }
            }
    
            listarAlertasComStatus();
        }, [uid, idCarro]));


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
                                    subtitle={`Próxima troca: ${Math.floor(alerta.mesesRestantes)} meses`}
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
