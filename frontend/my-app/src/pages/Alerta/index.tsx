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
import { useAlertas } from '../AlertaContext';
import { listarAlertasComStatusBff } from "../bff/alertaBff";



export default function Alerta() {
    const { alertas, setAlertas } = useAlertas();


    const navigation = useNavigation<NativeStackNavigationProp<any>>();
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

                    console.log("alertas com status vieram perfeitos!")

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
                                    subtitle={`Próxima troca: ${Math.floor(alerta.mesesRestantes)} meses`}
                                    subtitle2={`Última troca: ${formatarData(alerta.dataUltimaTroca)}`}
                                    imageRight={Editar}
                                    onImageRightPress={() => navigation.navigate("TestModal", {
                                        idAlerta: alerta.id,
                                        idCarro: idCarro,
                                        uid: uid
                                    })}
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
