import React, { useState } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, Modal } from 'react-native';

import { style } from "./styles";

import { ModalEdit } from "../../components/ModalEdit";
import { useRoute } from "@react-navigation/native";;

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
        </View>
    );
}
