import React, { use, useState } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, SafeAreaView } from 'react-native';

import { style } from "./styles";

import Logo from '../../assets/logoGoogle.png'
import Back from '../../assets/back.png'

import Logo2 from '../../assets/logoApple.png'
import { Input } from "../../components/Input";
import { Or } from "../../components/Or";
import { Google } from "../../components/Google";
import { Title } from "../../components/Title";
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { Header } from "../../components/Header";
import SelectBox from "../../components/SelectBox";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Input2 } from "../../components/Input2";
import { buscarCarros } from "../bff/carroBff";
import { useEffect } from "react";

type ResultadoBusca = {
    sucesso: boolean;
    marcas: { [key: string]: string[] };
    modelos: { [key: string]: string[] };
};

type ResultadoBusca = {
    sucesso: boolean;
    marcas: { [key: string]: string[] };
    modelos: { [key: string]: string[] };
};


export default function CadastrarCarro() {

    const [marcas, setMarcas] = useState<string[]>([]);
    const [modelosPorMarca, setModelosPorMarca] = useState<{ [key: string]: string[] }>({});
    const [modelosDisponiveis, setModelosDisponiveis] = useState<string[]>([]);

    const [marcaSelecionada, setMarcaSelecionada] = useState('');
    const [modeloSelecionado, setModeloSelecionado] = useState('');
    const navigation = useNavigation<NavigationProp<any>>();

   useEffect(() => {
  const carregarCarros = async () => {
    try {
      const resposta = await buscarCarros();
      if (resposta.sucesso) {
        const nomesMarcas = Object.keys(resposta.marcas);
        setMarcas(nomesMarcas);
        setModelosPorMarca(resposta.modelos);

        console.log('Marcas disponíveis:', nomesMarcas);
        console.log('Modelos por marca:', resposta.modelos);

        console.log("Estado de marcas:", marcas);
        console.log("Estado de modelosPorMarca:", modelosPorMarca);

      }
    } catch (error) {
      console.error('Erro ao buscar carros:', error);
    }
  };

  carregarCarros();
}, []);



    

    const [nome, setNome] = useState('');
    const [ano, setAno] = useState('');
    const [mediaKmSemana, setMediaKmSemana] = useState('');


    // const salvarCarro = async () => {
    //     if (!nome || !marcaSelecionada || !modeloSelecionado || !ano || !mediaKmSemana) {
    //         Alert.alert('Todos os campos devem estar preenchidos !');
    //         return;
    //     }

    //     try {
    //         const resposta = await cadastrarCarro(nome, marcaSelecionada, modeloSelecionado, ano, mediaKmSemana);
    //         console.log(resposta.mensagem);

    //         if (resposta.sucesso) {
    //             Alert.alert('Sucesso!', resposta.mensagem, [
    //                 {
    //                     text: 'OK',
    //                     onPress: () => navigation.navigate('BottomRoutes')
    //                 }
    //             ]);
    //         } else {
    //             Alert.alert('Erro', resposta.mensagem);
    //         }
    //     } catch (error) {
    //         Alert.alert('Erro', 'Não foi possível salvar o carro')
    //     }
    // }

    return (
        <SafeAreaView style={style.container}>
            <View style={style.boxTop}>
                <Header left={-50} title="Cadastro de carro"></Header>
            </View>
            <View style={style.boxMid}>

                <View style={style.scroll} >
                    <View style={style.apelido}>
                        <View style={style.acima}>
                            <Text style={style.subTitle}>Apelido</Text>
                        </View>
                        <Input2 value={nome} onChangeText={setNome} width={380} height={50} alignSelf="center" backgroundColor="white" placeholder=" Apelido..."></Input2>
                    </View>

                    <View style={style.apelido}>
                        <View style={style.acima}>
                            <Text style={style.subTitle}>Ano do carro</Text>
                        </View>
                        <Input2 value={ano} onChangeText={setAno} width={380} height={50} alignSelf="center" backgroundColor="white" placeholder=" DD/MM/AAAA"></Input2>
                    </View>

                    <View style={style.apelido}>
                        <View style={style.acima}>
                            <Text style={style.subTitle}>Km/mês</Text>
                        </View>
                        <Input2 value={mediaKmSemana} onChangeText={setMediaKmSemana} width={380} height={50} alignSelf="center" backgroundColor="white" placeholder=" Quilometros percorridos por mês"></Input2>
                    </View>
                    {/* lembrar de arrumar combobox para receber infos do backend */}
                    <View style={style.apelido2}>
                        <View style={style.acima}>
                            <Text style={style.subTitle}>Marca</Text>
                        </View>
                        <SelectBox
                            items={marcas.map(marca => ({ label: marca, value: marca }))}
                            defaultValue="Selecione"
                            onValueChange={(val) => {
                                setMarcaSelecionada(val);
                                setModelosDisponiveis(modelosPorMarca[val] || []);
                            }}
                            placeholder="Escolha uma marca"
                        />



                    </View>

                    <View style={style.apelido2}>
                        <View style={style.acima}>
                            <Text style={style.subTitle}>Modelo</Text>
                        </View>

                        <SelectBox
                            items={modelosDisponiveis.map(modelo => ({ label: modelo, value: modelo }))}
                            defaultValue="Selecione"
                            onValueChange={setModeloSelecionado}
                            placeholder="Escolha um modelo"
                        />


                    </View>

                    <View style={style.done}>
                        <TouchableOpacity style={style.button} onPress={() => console.log("ainda nao")} >
                            <Text style={style.criar}>Concluído</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={style.boxBottom}>

            </View>
        </SafeAreaView>
    );
}
