import React, { forwardRef, useState, LegacyRef } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, TextInputProps } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

import { style } from "./styles";

import Back from '../../assets/back.png'

import Logo from '../../assets/logoGoogle.png'

import Logo2 from '../../assets/logoApple.png'

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
    onIconRightPress?: () => void,
    onBackPress?: () => void 
}

export const Header = forwardRef((Props: Props, ref: LegacyRef<TextInput> | null) => {

    const navigation = useNavigation<NavigationProp<any>>();

    const { IconLeft, IconRight, IconLeftName, IconRightName, title, left, maxFontSizeMultiplier, onIconLeftPress, onIconRightPress, onBackPress, placeholder, ...rest } = Props

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress(); 
        } else {           
             navigation.navigate('Inicial'); 
        }
    };

    return (
        
            <View style={style.header}>

                    <TouchableOpacity style={style.backButton} onPress={handleBackPress}>
                        <Image style={style.back} source={Back} />
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