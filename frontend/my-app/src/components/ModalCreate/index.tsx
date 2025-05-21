
import React, { forwardRef, useState, LegacyRef } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, TextInputProps, ImageSourcePropType, Modal } from 'react-native';

import { style } from "../ModalCreate/styles";

import { BlurView } from 'expo-blur';

import Bola from '../../assets/bola.png'
import Delete from '../../assets/delete.png'
import Teste from '../../assets/teste.png'
import Close from '../../assets/close.png'
import Calendar from '../../assets/calendar.png'
import DownArrow from '../../assets/downArrow.png'

import Logo from '../../assets/logoGoogle.png'

import Logo2 from '../../assets/logoApple.png'

import { MaterialIcons, FontAwesome, Octicons } from '@expo/vector-icons';
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
    visible?: boolean,
    imageLeft?: ImageSourcePropType,
    imageRight?: ImageSourcePropType,
    imageLeftStyle?: object,
    imageRightStyle?: object,
    onIconLeftPress?: () => void,
    onIconRightPress?: () => void
}

export const ModalCreate = forwardRef((Props: Props, ref: LegacyRef<TextInput> | null) => {

    const { title = "Produto", subtitle = "Próxima troca: XX/XX", subtitle2 = "Última troca: XX/XX", bottomText = "Estado Vazio", imageLeft, imageRight, imageLeftStyle, imageRightStyle, ...rest } = Props

    const [modalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <>
            <Modal style={style.modal}>
                <View style={style.modal2}>
                    <View style={style.boxCard}>
                        <View style={style.A1}>
                            <View style={style.a1}>

                                <Text style={style.t0}>Novo Alerta</Text>
                            </View>

                            <View style={style.a2}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Image style={style.close}
                                        source={Close}></Image>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={style.A2}>
                            <View style={style.b1}>
                                <View style={style.b2}>
                                    <Text style={style.t1}>Selecione uma peça</Text>
                                    <Input backgroundColor='white' placeholder="Selecionar"></Input>
                                    <Image style={style.downArrow}
                                        source={DownArrow}></Image>
                                </View>

                                <View style={style.b22}>
                                    <Text style={style.t1}>Última troca</Text>
                                    <Input backgroundColor='white' placeholder="DD/MM/AAAA">
                                    </Input>
                                    <Image style={style.calendar}
                                        source={Calendar}></Image>
                                </View>

                            </View>
                        </View>

                        <View style={style.A3}>
                            <View style={style.c1}>
                                <TouchableOpacity style={style.button} onPress={() => setModalVisible(false)}>
                                    <View>e
                                        <Text style={style.criar}>Concluído</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>
                </View>
            </Modal>
        </>
    )
});




