 
import React, { forwardRef, useState, LegacyRef } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, TextInputProps, ImageSourcePropType, SafeAreaView } from 'react-native';

import {style} from "../Card/styles";

import Bola from '../../assets/bola.png'
import Teste from '../../assets/teste.png'

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

export const Card = forwardRef((Props:Props, ref: LegacyRef<TextInput> | null )=> {

    const { title, subtitle, subtitle2, bottomText, imageLeft, imageRight , ...rest} = Props

    return(
        <SafeAreaView>
            <View style= {style.boxCard}>
                    <View style= {style.peca}>
                        <Text style= {style.t1}>{title}</Text>
                    </View>
                    <View style= {style.data}>
                        <Text style= {style.t2}>{subtitle}</Text>
                        <Text>{subtitle2}</Text>
                    </View>
                    <View style= {style.a1}>
                        <Image style={[style.teste, Props.imageLeftStyle]}
                        source={imageRight}>
                        </Image>
                        <View>
                            <Text>{bottomText}</Text>
                        </View> 
                    </View>

                </View>    
        </SafeAreaView>  
    )
});



                
       