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

  const handleLogout = async () => {
    try {
      const resultado = await logoutUsuario();
      Alert.alert("Sucesso", resultado.mensagem);

      await AsyncStorage.removeItem("uid");

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });

    } catch (error: any) {
      Alert.alert("Erro", error?.mensagem || "Erro ao deslogar.");
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.boxTop}>
        <Header title="Configurações" />
      </View>

      <View style={style.boxMid}>
        <View style={style.abaixa}>
          <CustomBtn
            imageLeft={Car2}
            subtitle="Adicionar carro"
            imageRight={Car2}
            left={-80}
            goToo="CadastroCarro"
          />

          <CustomBtn
            imageLeft={logout}
            subtitle="Sair da conta"
            imageRight={logout}
            left={-94}
            onPress={handleLogout}
          />
        </View>
      </View>

      <View style={style.boxBottom} />
    </SafeAreaView>
  );
}
