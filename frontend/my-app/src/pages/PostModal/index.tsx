import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ModalPost from '../../components/ModalPost';
import { style } from './styles';

export default function PostModal() {


    return (
        <View style={style.container}>
        
                    <View style={style.boxTop}>
                        
                    </View>
        
                    <View style={style.boxMid}>
                        <View style={style.modalCentro}>
                            <ModalPost visible={true} onClose={function (): void {
                        throw new Error('Function not implemented.');
                    } } onPost={function (data: { text: string; image: string | null; }): void {
                        throw new Error('Function not implemented.');
                    } }></ModalPost>
                        </View>
                    </View>
        
                    <View style={style.boxBottom}>
                        
                        
                    </View>
            
                </View>
    );
};