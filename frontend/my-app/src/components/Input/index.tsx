import React, { forwardRef, useState, LegacyRef } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, TextInputProps } from 'react-native';

import {style} from "./styles";

import Logo from '../../assets/logoGoogle.png'

import Logo2 from '../../assets/logoApple.png'

import {MaterialIcons, FontAwesome, Octicons} from '@expo/vector-icons';

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> |
                    React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
                    React.ComponentType<React.ComponentProps<typeof Octicons>>;

type Props = TextInputProps & {
    IconLeft?: IconComponent,
    IconRight?: IconComponent,
    IconLeftName?: string,
    IconRightName?: string,
    title?: string,
    backgroundColor?: string,
    onIconLeftPress?: () => void,
    onIconRightPress?: () => void
}

export const Input = forwardRef((Props:Props, ref: LegacyRef<TextInput> | null )=> {

    const {IconLeft, IconRight, IconLeftName, IconRightName, title, onIconLeftPress, onIconRightPress, backgroundColor, placeholder, ...rest} = Props

    return(
        <>
            <TextInput placeholder={placeholder}
            ref={ref}
            style={[style.input, { backgroundColor }]}  
            {...rest}
        
            >
            </TextInput>  
        </>  
    )
});