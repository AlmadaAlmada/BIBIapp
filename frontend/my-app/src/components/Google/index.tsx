 
import React, { forwardRef, useState, LegacyRef } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, TextInputProps } from 'react-native';

import {style} from "../Google/styles";

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
    onIconLeftPress?: () => void,
    onIconRightPress?: () => void
}

export const Google = forwardRef((Props:Props, ref: LegacyRef<TextInput> | null )=> {

    const {IconLeft, IconRight, IconLeftName, IconRightName, title, onIconLeftPress, onIconRightPress, placeholder, ...rest} = Props

    return(
        <>
                <View style={style.boxButton2}>
                        <TouchableOpacity style={style.google}>
                            <Image style={style.logo}
                            source={Logo}></Image>
                            <Text style={style.criar}>Continue with Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.google}>
                            <Image style={style.logo2}
                            source={Logo2}></Image>
                            <Text style={style.criar}>Continue with Apple</Text>
                        </TouchableOpacity>
                </View>
        </>  
    )
});



                
       