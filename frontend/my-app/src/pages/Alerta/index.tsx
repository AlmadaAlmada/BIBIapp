import React, { useState } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, ScrollView } from 'react-native';

import { style } from "./styles";
import Bola from '../../assets/bola.png'
import Editar from '../../assets/editar.png'
import Plus from '../../assets/plus.png'

import { Card2 } from "../../components/Card2";
import { ModalEdit } from "../../components/ModalEdit";
import { BlurView } from 'expo-blur';
import { ModalCreate } from "../../components/ModalCreate";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/core";


export default function Alerta() {

     const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <View style={style.container}>

            <View style={style.boxTopzao}>

            </View>
            
            
            <View style={style.boxTop}>

        
            <ScrollView style= {style.scroll}>
                    
                    <View style={style.formata}>

                        <Card2
                            imageLeft={Bola}
                            title="Produto"
                            subtitle="Próxima troca: XX/XX"
                            subtitle2="Última troca: XX/XX"
                            imageRight={Editar}
                            imageRightStyle={{ width: 340, height: 330 }}>
                        </Card2>

                        <Card2
                            imageLeft={Bola}
                            title="Produto"
                            subtitle="Próxima troca: XX/XX"
                            subtitle2="Última troca: XX/XX"
                            imageRight={Editar}
                            imageRightStyle={{ width: 340, height: 330 }}>
                        </Card2>

                        <Card2
                            imageLeft={Bola}
                            title="Produto"
                            subtitle="Próxima troca: XX/XX"
                            subtitle2="Última troca: XX/XX"
                            imageRight={Editar}
                            imageRightStyle={{ width: 340, height: 330 }}>
                        </Card2>

                        <Card2
                            imageLeft={Bola}
                            title="Produto"
                            subtitle="Próxima troca: XX/XX"
                            subtitle2="Última troca: XX/XX"
                            imageRight={Editar}
                            imageRightStyle={{ width: 340, height: 330 }}>
                        </Card2>

                        <Card2
                            imageLeft={Bola}
                            title="Produto"
                            subtitle="Próxima troca: XX/XX"
                            subtitle2="Última troca: XX/XX"
                            imageRight={Editar}
                            imageRightStyle={{ width: 340, height: 330 }}>
                        </Card2>

                        <Card2
                            imageLeft={Bola}
                            title="Produto"
                            subtitle="Próxima troca: XX/XX"
                            subtitle2="Última troca: XX/XX"
                            imageRight={Editar}
                            imageRightStyle={{ width: 340, height: 330 }}>
                        </Card2>

                        <Card2
                            imageLeft={Bola}
                            title="Produto"
                            subtitle="Próxima troca: XX/XX"
                            subtitle2="Última troca: XX/XX"
                            imageRight={Editar}
                            imageRightStyle={{ width: 340, height: 330 }}>
                        </Card2>

                        <Card2
                            imageLeft={Bola}
                            title="Produto"
                            subtitle="Próxima troca: XX/XX"
                            subtitle2="Última troca: XX/XX"
                            imageRight={Editar}
                            imageRightStyle={{ width: 340, height: 330 }}>
                        </Card2> 

                        

                    </View>
                </ScrollView>
                    
            </View>
            <View style={style.boxMid}>
                

                <TouchableOpacity onPress={()=> navigation.navigate("TestModal2") }>
                    <Image style={style.plus}
                    source={Plus}
                    ></Image>
                </TouchableOpacity>

            </View>

        </View>
    );
}
