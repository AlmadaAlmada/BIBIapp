import React, { useState } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, SafeAreaView } from 'react-native';

import { style } from "./styles";

import Car2 from '../../assets/car2.png'
import Sino from '../../assets/sino.png'
import Engrena from '../../assets/engrena.png'
import World from '../../assets/world.png'
import Lock from '../../assets/lock.png'

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
import Alerta from "../Alerta";
import { CustomBtn } from "../../components/CustomBtn";
import { Card2 } from "../../components/Card2";
import CadastroCarro from "../CadastroCarro";



export default function Configura() {

    const navigation = useNavigation<NavigationProp<any>>();



    return (
        <SafeAreaView style={style.container}>
            <View style={style.boxTop}>
                <Header title="Configurações"></Header>
            </View>
            <View style={style.boxMid}>
                
                <View style={style.abaixa}>
                    <CustomBtn
                        imageLeft={Car2}
                        subtitle="Adicionar carro"
                        imageRight={Car2}
                        left={-80}
                        goToo="CadastroCarro">
                    </CustomBtn>

                    <CustomBtn
                        imageLeft={Sino}
                        subtitle="Notificações"
                        imageRight={Sino}
                        left={-94}>
                    </CustomBtn>

                    <CustomBtn
                        imageLeft={Engrena}
                        subtitle="Conta"
                        imageRight={Engrena}
                        left={-127}>
                    </CustomBtn>

                    <CustomBtn
                        imageLeft={World}
                        subtitle="Idioma"
                        imageRight={World}
                        left={-122}>
                    </CustomBtn>

                    <CustomBtn
                        imageLeft={Lock}
                        subtitle="Privacidade"
                        imageRight={Lock}
                        left={-98}>
                    </CustomBtn>

                </View>

            </View>

            <View style={style.boxBottom}>

            </View>
        </SafeAreaView>
    );
}
