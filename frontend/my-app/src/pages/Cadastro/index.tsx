import React, { useState } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert } from 'react-native';

import { style } from "./styles";

import Logo from '../../assets/logoGoogle.png'

import Logo2 from '../../assets/logoApple.png'
import { Input } from "../../components/Input";
import { Or } from "../../components/Or";
import { Google } from "../../components/Google";
import { Title } from "../../components/Title";

export default function Cadastro() {

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Title title="Create an account"></Title>
            </View>
            <View style={style.boxMid}>
                <Input placeholder="Full Name"></Input>
                <Input placeholder="email@domain.com"></Input>
                <Input placeholder="password"></Input>
                <Input placeholder="confirm password"></Input>
                <View style={style.boxButton}>
                    <TouchableOpacity style={style.button}>
                        <Text style={style.criar}>Concluído</Text>
                    </TouchableOpacity>
                </View>
                <Or></Or>
            </View>

            <View style={style.boxBottom}>
                <Google></Google>
                <View style={style.boxTermo}>
                    <Text style={style.termo}> By clicking continue, you agree to our Terms of Service</Text>
                    <Text style={style.termo}>                                  and Privacy Policy</Text>
                </View>
            </View>
        </View>
    );
}
