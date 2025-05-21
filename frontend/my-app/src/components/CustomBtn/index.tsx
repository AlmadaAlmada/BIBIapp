
import React, { forwardRef, useState, LegacyRef } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, TextInputProps, ImageSourcePropType, TouchableOpacityProps } from 'react-native';

import { style } from "../CustomBtn/styles";

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Bola from '../../assets/bola.png'
import Teste from '../../assets/teste.png'

import Logo from '../../assets/logoGoogle.png'

import Logo2 from '../../assets/logoApple.png'

import { MaterialIcons, FontAwesome, Octicons } from '@expo/vector-icons';

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> |
    React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
    React.ComponentType<React.ComponentProps<typeof Octicons>>;

type Props = TouchableOpacityProps & {
    IconLeft?: IconComponent,
    IconRight?: IconComponent,
    IconLeftName?: string,
    IconRightName?: string,
    subtitle?: string,
    left?: number,
    borderBottomWidth?: number,
    imageLeft?: ImageSourcePropType,
    imageRight?: ImageSourcePropType,
    imageLeftStyle?: object,
    imageRightStyle?: object,
    goToo?: string,
    onPress?: ()=> void,
    onIconLeftPress?: () => void,
    onIconRightPress?: () => void
}

export const CustomBtn = forwardRef((Props: Props, ref: LegacyRef<TextInput> | null) => {

    const { subtitle = "Próxima troca: XX/XX", imageLeft, goToo, left, borderBottomWidth, onPress, imageRight, ...rest } = Props

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <>
            <TouchableOpacity onPress={() => goToo ? navigation.navigate(goToo) : onPress?.()}>
                <View style={style.boxCard}>
                    <View
                    ref={ref}
                    style={[style.esquerda, { left, borderBottomWidth}]} 
                    {...rest}>
                        <View style={style.a1}>
                            <View style={style.fixImage}>
                                <Image style={style.bola}
                                    source={imageLeft}></Image>
                            </View>
                        </View>
                        <View>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={style.t2}>{subtitle}</Text>
                        </View>

                    </View>
                  
                </View>
            </TouchableOpacity>
        </>
    )
});




