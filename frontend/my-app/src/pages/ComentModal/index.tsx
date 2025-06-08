import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ModalPost from '../../components/ModalComent';
import { style } from '../PostModal/styles';

export default function  ModalComent(){

    return (
        <View style={style.container}>

            <View style={style.boxTop}>

            </View>

            <View style={style.boxMid}>
                <View style={style.modalCentro}>
                    <ModalPost visible={true} onClose={function (): void {
                        throw new Error('Function not implemented.');
                    }} onPost={function (data: { text: string | null; }): void {
                        throw new Error('Function not implemented.');
                    }}></ModalPost>
                </View>
            </View>

            <View style={style.boxBottom}>


            </View>

        </View>
    );

}