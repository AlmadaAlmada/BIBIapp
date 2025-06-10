import React, { useCallback, useEffect, useState } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, ScrollView } from 'react-native';

import { style } from "./styles";
import Bola from '../../assets/bola.png'
import Editar from '../../assets/editar.png'
import Plus from '../../assets/plus.png'

import { Card2 } from "../../components/Card2";
import { ModalEdit } from "../../components/ModalEdit";
import { BlurView } from 'expo-blur';
import { ModalCreate } from "../../components/ModalCreate";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { SafeAreaView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { listarAlertasComStatusBff } from "../bff/alertaBff";


export default function Alerta() {

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [idCarro, setidCarro] = useState<string | null>(null);

    const [alertas, setAlertas] = useState<any[]>([]);


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

        if (!uid) return;
        if (!idCarro) return;

        const listarAlertasComStatus = async () => {
            try {

                const resposta = await listarAlertasComStatusBff(uid!, idCarro!);

                console.log("Resposta dos cards do alerta com status:")
                console.log(resposta);

                if (resposta.sucesso && Array.isArray(resposta.alertas)) {
                    resposta.alertas.forEach((alerta: { peca: any; dataUltimaTroca: any; status: any; kmRestante: any; mesesRestantes: any; }, index: number) => {
                        console.log(`Alerta ${index + 1}`);
                        console.log(`Peça: ${alerta.peca}`);
                        console.log(`Última troca: ${alerta.dataUltimaTroca}`);
                        console.log(`Status: ${alerta.status}`);
                        console.log(`KM restante: ${alerta.kmRestante}`);
                        console.log(`Meses restantes: ${alerta.mesesRestantes}`);
                    });

                    setAlertas(resposta.alertas);
                }

                if (resposta.sucesso) {

                    console.log("alertas com status vieram perfeitos!")

                } else {
                    Alert.alert('Erro', resposta.mensagem);
                }
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível salvar o carro')
            }
        }

        listarAlertasComStatus();
    }, [uid, idCarro]);

    function formatarData(data: string): string {
        const objData = new Date(data);
        if (isNaN(objData.getTime())) return "Data inválida";
        return objData.toISOString().split("T")[0];
    }

    return (
        <SafeAreaView style={style.container}>

            <View style={style.boxTopzao}>

            </View>


            <View style={style.boxTop}>


                <ScrollView style={style.scroll}>

                    <View style={style.formata}>

                        {alertas.map((alerta, index) => (
                            <View style={style.formata} key={index}>
                                <Card2
                                    imageLeft={Bola}
                                    title={alerta.peca}
                                    subtitle={`Próxima troca: ${alerta.mesesRestantes} meses`}
                                    subtitle2={`Última troca: ${formatarData(alerta.dataUltimaTroca)}`}
                                    imageRight={Editar}
                                    bottomText={alerta.status}
                                />
                            </View>
                        ))}



                    </View>
                </ScrollView>

            </View>
            <View style={style.boxMid}>


                <TouchableOpacity onPress={() => navigation.navigate("TestModal2")}>
                    <Image style={style.plus}
                        source={Plus}
                    ></Image>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    );
}
