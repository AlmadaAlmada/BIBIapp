import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Alert,
  ScrollView
} from 'react-native';

import { style } from "./styles";

import Car2 from '../../assets/car2.png'
import Sino from '../../assets/sino.png'
import Engrena from '../../assets/engrena.png'
import World from '../../assets/world.png'
import Lock from '../../assets/lock.png'
import logout from '../../assets/logout.png';

import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

import { Header } from "../../components/Header";
import { CustomBtn } from "../../components/CustomBtn";

import { logoutUsuario } from "../bff/userBff";

import AsyncStorage from "@react-native-async-storage/async-storage"; 

export default function Configura() {
    const navigation = useNavigation<NavigationProp<any>>();



    return (
        <SafeAreaView style={style.container}>
            <View style={style.boxTop}>
                {/* Header component */}
                <Header title="Configurações" onIconLeftPress={() => navigation.goBack()}></Header>
            </View>
            <View style={style.boxMid}>
                {/* Wrap CustomBtns in a View with the settingsBlock style */}
                <View style={style.settingsBlock}>
                    <View style={style.abaixa}>
                        <View style={style.btn}>
                            <CustomBtn
                                imageLeft={Car2}
                                subtitle="Adicionar carro"
                                goToo="CadastroCarro"
                            >
                            </CustomBtn>
                        </View>
                        <View style={style.btn}>
                            <CustomBtn
                                imageLeft={Sino}
                                subtitle="Notificações"
                            >
                            </CustomBtn>
                        </View>
                        <View style={style.btn}>
                            <CustomBtn
                                imageLeft={Engrena}
                                subtitle="Conta"
                            >
                            </CustomBtn>
                        </View>
                        <View style={style.btn}>

                            <CustomBtn
                                imageLeft={World}
                                subtitle="Idioma"
                            >
                            </CustomBtn>
                        </View>
                        <View style={style.btn}>
                            <CustomBtn
                                imageLeft={Lock}
                                subtitle="Privacidade"
                            >
                            </CustomBtn>
                        </View>
                    </View>
                </View>

                {/* Bottom text links */}
                <View style={style.bottomTextContainer}>
                    <Text style={style.bottomText}>Políticas de Privacidade - Termos de serviço</Text>
                    <Text style={style.bottomText}>Declaração de acessibilidade</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}
