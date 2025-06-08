import React, { useEffect, useState } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, Modal } from 'react-native';

import { style } from "./styles";

import Bola from '../../assets/bola.png'
import Delete from '../../assets/delete.png'

import { Input } from "../../components/Input";
import { Or } from "../../components/Or";
import { Google } from "../../components/Google";
import { Title } from "../../components/Title";
import { Card } from "../../components/Card";
import { themas } from "../../global/themes";
import { ModalEdit } from "../../components/ModalEdit";
import { ModalCreate } from "../../components/ModalCreate";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TestModal2() {

    return (
        <View style={style.container}>

            <View style={style.boxTop}>
                
            </View>

            <View style={style.boxMid}>
                <View style={style.modalCentro}>
                    <ModalCreate></ModalCreate>
                </View>
            </View>

            <View style={style.boxBottom}>
                
                
            </View>
    
        </View>
    );
}
