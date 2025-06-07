import React, { useState } from "react";

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
import { ScrollView } from "react-native-gesture-handler";
import { Input2 } from "../../components/Input2";



export default function CadastroCarro() {

    const navigation = useNavigation<NavigationProp<any>>();



    return (
        <SafeAreaView style={style.container}>
            <View style={style.boxTop}>
                <Header left={-50} title="Cadastro de carro"></Header>
            </View>
            <View style={style.boxMid}>

                <ScrollView style={style.scroll}>
                    <View style={style.apelido}>
                        <View style={style.acima}>
                            <Text style={style.subTitle}>Apelido</Text>
                        </View>
                        <Input2 width={380} height={50} alignSelf="center" backgroundColor="white" placeholder=" Apelido..."></Input2>
                    </View>

                    <View style={style.apelido}>
                        <View style={style.acima}>
                            <Text style={style.subTitle}>Ano do carro</Text>
                        </View>
                        <Input2 width={380} height={50} alignSelf="center" backgroundColor="white" placeholder=" DD/MM/AAAA"></Input2>
                    </View>

                    <View style={style.apelido}>
                        <View style={style.acima}>
                            <Text style={style.subTitle}>Km/mês</Text>
                        </View>
                        <Input2 width={380} height={50} alignSelf="center" backgroundColor="white" placeholder=" Quilometros percorridos por mês"></Input2>
                    </View>

                    <View style={style.apelido2}>
                        <View style={style.acima}>
                            <Text style={style.subTitle}>Marca</Text>
                        </View>
                        <SelectBox
                            items={[
                                { label: 'Chevrolet', value: 'Chevrolet' },
                                { label: 'Hyundai', value: 'Hyundai' },
                                { label: 'Volkswagem', value: 'Volkswagem' },
                                { label: 'Fiat', value: 'Fiat' },
                            ]}
                            defaultValue="Selecione"
                            onValueChange={(val) => console.log("Selecionado:", val)}
                            placeholder="Escolha uma marca"
                        />

                    </View>

                    <View style={style.apelido2}>
                        <View style={style.acima}>
                            <Text style={style.subTitle}>Modelo</Text>
                        </View>
                        <SelectBox
                            items={[
                                { label: 'Chevrolet', value: 'Chevrolet' },
                                { label: 'Hyundai', value: 'Hyundai' },
                                { label: 'Volkswagem', value: 'Volkswagem' },
                                { label: 'Fiat', value: 'Fiat' },
                            ]}
                            defaultValue="Selecione"
                            onValueChange={(val) => console.log("Selecionado:", val)}
                            placeholder="Escolha um modelo"
                        />
                    </View>

                    <View style={style.done}>
                        <TouchableOpacity style={style.button}>
                            <Text style={style.criar}>Concluído</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>

            <View style={style.boxBottom}>

            </View>
        </SafeAreaView>
    );
}
