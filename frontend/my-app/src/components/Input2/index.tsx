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
    left?: number,
    width?: number,
    height?: number,
    alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    backgroundColor?: string,
    onIconLeftPress?: () => void,
    onIconRightPress?: () => void
}

export const Input2 = forwardRef((Props:Props, ref: LegacyRef<TextInput> | null )=> {

    const { placeholder, ...rest } = Props

    return (
      <TextInput
        ref={ref}
        placeholder={placeholder}
        style={[style.inputPadrao, Props.style]}
        {...rest}
      />
    );
});