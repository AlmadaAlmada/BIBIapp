
import React, { forwardRef, useState, LegacyRef } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, TextInputProps } from 'react-native';

import { style } from "./styles";

import Back from '../../assets/back.png'

import Logo from '../../assets/logoGoogle.png'

import Logo2 from '../../assets/logoApple.png'

import { useNavigation } from '@react-navigation/native';

import { NavigationProp } from '@react-navigation/native';

import { MaterialIcons, FontAwesome, Octicons } from '@expo/vector-icons';

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> |
    React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
    React.ComponentType<React.ComponentProps<typeof Octicons>>;

type Props = TextInputProps & {
    IconLeft?: IconComponent,
    IconRight?: IconComponent,
    IconLeftName?: string,
    IconRightName?: string,
    title?: string,
    left?: number,
    onIconLeftPress?: () => void,
    onIconRightPress?: () => void
}

export const Header = forwardRef((Props: Props, ref: LegacyRef<TextInput> | null) => {

    const { IconLeft, IconRight, IconLeftName, IconRightName, title, left, maxFontSizeMultiplier, onIconLeftPress, onIconRightPress, placeholder, ...rest } = Props
    const navigation = useNavigation<NavigationProp<any>>();

    return (
        
            <View style={style.header}>

                    <TouchableOpacity style={style.backButton} onPress = {() => navigation.navigate("BottomRoutes")} >
                        <Image style={style.back}
                            source={Back}></Image>
                           
                    </TouchableOpacity>


                <View
                    ref={ref}
                    style={[style.backText]}
                    {...rest}>
                    <Text style={style.textoAba}>{title}</Text>
                </View>
            </View>
        
    )
});




