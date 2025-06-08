import React, { useEffect, useState } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';

import { style } from "./styles";

import Foto from '../../assets/1.png'
import Logo3 from '../../assets/fiat2.png'
import Bola from '../../assets/bola.png'
import Teste from '../../assets/teste.png'
import { Card } from "../../components/Card";
import { Dimensions, Platform } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { buscarDadosCarroBff } from "../bff/carroBff";

const { width, height } = Dimensions.get('window');

// 🧠 Mapa das imagens locais (adicione conforme necessário)
const imagensCarros: Record<string, any> = {
    "BIBIapp Backendimagenshilux.png": require('../../assets/hilux.png'),
    "BIBIapp Backendimagenscorolla.png": require('../../assets/corolla.png'),
};


export default function Inicial() {

    const [carroImage, setCarroImage] = useState('');

    const [uid, setUid] = useState<string | null>(null);

    // Buscar o UID ao montar a tela
    useEffect(() => {
        const buscarUid = async () => {
            const uidSalvo = await AsyncStorage.getItem('uid');
            console.log("UID carregado:", uidSalvo);
            setUid(uidSalvo);
        };
        buscarUid();
    }, []);

    useEffect(() => {

        if (!uid) return;

        const buscarDadosCarro = async () => {
            try {
                console.log("uid tela inicial debto da busca carro:", uid)
                const resposta = await buscarDadosCarroBff(uid!);
                console.log("tem um texto aqui")
                console.log(resposta);

                let imagemUrl = resposta.carros[0]?.imagemUrl;
                console.log(" vetor na posicao 0 ", imagemUrl);

                if (imagensCarros[imagemUrl]) {
                    setCarroImage(imagensCarros[imagemUrl]);
                } else {
                    console.warn("Imagem não encontrada:", imagemUrl);
                }

                if (resposta.sucesso) {

                    console.log("its so confusing sometimes to be a girl")

                } else {
                    Alert.alert('Erro', resposta.mensagem);
                }
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível salvar o carro')
            }
        }

        buscarDadosCarro();
    }, [uid]);

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
                        {/* <Card  
                            imageLeft={Bola}
                            title="Produto"
                            subtitle="Próxima troca: XX/XX"
                            subtitle2="Última troca: XX/XX"
                            imageRight={Teste}
                            bottomText="Estado Vazio">

                        </Card>

                        <Card  
                            imageLeft={Bola}
                            title="Produto"
                            subtitle="Próxima troca: XX/XX"
                            subtitle2="Última troca: XX/XX"
                            imageRight={Teste}
                            bottomText="Estado Vazio">

                        </Card>

                        <Card  
                            imageLeft={Bola}
                            title="Produto"
                            subtitle="Próxima troca: XX/XX"
                            subtitle2="Última troca: XX/XX"
                            imageRight={Teste}
                            bottomText="Estado Vazio">

                        </Card>

                        <Card  
                            imageLeft={Bola}
                            title="Produto"
                            subtitle="Próxima troca: XX/XX"
                            subtitle2="Última troca: XX/XX"
                            imageRight={Teste}
                            bottomText="Estado Vazio">

                        </Card>

                        <Card  
                            imageLeft={Bola}
                            title="Produto"
                            subtitle="Próxima troca: XX/XX"
                            subtitle2="Última troca: XX/XX"
                            imageRight={Teste}
                            bottomText="Estado Vazio">

                        </Card> */}
                    </View>
                </ScrollView>

            </View>


        </SafeAreaView>
    );
}
