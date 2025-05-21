 
import React, { forwardRef, useState, LegacyRef } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, TextInputProps, ImageSourcePropType, Modal } from 'react-native';

import { BlurView } from 'expo-blur';


import {style} from "../ModalEdit/styles";

import Bola from '../../assets/bola.png'
import Delete from '../../assets/delete.png'
import Teste from '../../assets/teste.png'

import Logo from '../../assets/logoGoogle.png'

import Logo2 from '../../assets/logoApple.png'

import {MaterialIcons, FontAwesome, Octicons} from '@expo/vector-icons';
import { Input } from "../Input";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/core";

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> |
                    React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
                    React.ComponentType<React.ComponentProps<typeof Octicons>>;

type Props = TextInputProps & {
    IconLeft?: IconComponent,
    IconRight?: IconComponent,
    IconLeftName?: string,
    IconRightName?: string,
    title?: string,
    subtitle?: string,
    subtitle2?: string,
    bottomText?: string,
    imageLeft?: ImageSourcePropType,
    imageRight?: ImageSourcePropType,
    imageLeftStyle?: object,
    imageRightStyle?: object,
    onIconLeftPress?: () => void,
    onIconRightPress?: () => void
}

export const ModalEdit = forwardRef((Props:Props, ref: LegacyRef<TextInput> | null )=> {

    const { title = "Produto", subtitle = "Próxima troca: XX/XX", subtitle2 = "Última troca: XX/XX", bottomText = "Estado Vazio", imageLeft, imageRight, imageLeftStyle, imageRightStyle, ...rest} = Props

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return(
        <>
            <View style={style.boxModal}>
                    <Modal transparent animationType="fade" style={style.modal}>
                        <BlurView intensity={100} tint="regular" style={style.blurContainer}>
                            <View style={style.boxCard}>
                                <View style={style.A1}>
                                    <View style={style.a1}>
                                        <Image style={style.bola}
                                            source={Bola}></Image>
                                        <Text style={style.t0}>Produto</Text>
                                    </View>

                                    <View style={style.a2}>
                                        <TouchableOpacity>
                                            <Image style={style.delete}
                                                source={Delete}></Image>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                                <View style={style.A2}>
                                    <View style={style.b1}>
                                        <Text style={style.t1}>Última troca</Text>
                                        <View style={style.b2}>
                                            <Input backgroundColor='#F0F0F0' placeholder="DD/MM/AAAA"></Input>
                                        </View>
                                        <Text style={style.t2}>Próxima troca: XX/XX</Text>
                                    </View>
                                </View>

                                <View style={style.A3}>
                                    <View style={style.c1}>
                                        <TouchableOpacity style={style.button} onPress={() => navigation.goBack()}>
                                            <View>
                                                <Text style={style.criar}>Concluído</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                            </View>
                        </BlurView>
                    </Modal>
                </View>
        </>  
    )
});



                
       