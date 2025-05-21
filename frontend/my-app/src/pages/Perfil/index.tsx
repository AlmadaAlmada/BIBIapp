import React, { useState } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert } from 'react-native';

import { style } from "./styles";

import Logo from '../../assets/logoGoogle.png'

import Logo2 from '../../assets/logoApple.png'
import { Input } from "../../components/Input";
import { Or } from "../../components/Or";
import { Google } from "../../components/Google";
import { Title } from "../../components/Title";
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';



export default function Perfil() {

    const navigation = useNavigation<NavigationProp<any>>();

    

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Title title="perfil"></Title>
            </View>
            <View style={style.boxMid}>
                <Text> alo</Text>
            </View>

            <View style={style.boxBottom}>
                <Google></Google>
            </View>
        </View>
    );
}
