import React, { useState } from "react";

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
import { useRoute } from "@react-navigation/native";
import { ModalCreate } from "../../components/ModalCreate";

export default function TestModal() {
    const route = useRoute();
  const { idAlerta, idCarro, uid } = route.params as {
    idAlerta: string;
    idCarro: string;
    uid: string;
  };

    return (
        <View style={style.container}>

            <View style={style.boxTop}>
                
            </View>

            <View style={style.boxMid}>
                <View style={style.modalCentro}>
                    <ModalEdit idAlerta={idAlerta} idCarro={idCarro} uid={uid} ></ModalEdit>
                </View>
            </View>

            <View style={style.boxBottom}>
                
                
            </View>
    
        </View>
    );
}
