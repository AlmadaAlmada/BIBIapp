 
import React, { forwardRef, useState, LegacyRef } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, TextInputProps, ImageSourcePropType } from 'react-native';

import {style} from "././styles";

import Alerta from '../../pages/Alerta';

import House from '../../assets/house.png'
import Car from '../../assets/car.png'
import Chat from '../../assets/chat.png'
import Settings from '../../assets/settings.png'
import Profile from '../../assets/profile.png'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';


import Bola from '../../assets/bola.png'
import Teste from '../../assets/teste.png'

import Logo from '../../assets/logoGoogle.png'

import Logo2 from '../../assets/logoApple.png'

import {MaterialIcons, FontAwesome, Octicons} from '@expo/vector-icons';

export default function Lowbar({ state, navigation }: BottomTabBarProps) {

    const go = (screenName:string)=>{
        navigation.navigate(screenName)
    }

    return(
        <>
             <View style={style.lowbar}>
                    <View>
                        <TouchableOpacity onPress={()=>go("Inicial")}>
                            <Image style={style.icons}
                            source={House}>
                            </Image>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={()=>go("Alerta")}>
                            <Image style={style.icons}
                            source={Car}>
                            </Image>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={()=>go("Forum1")}>
                            <Image style={style.icons}
                            source={Chat}>
                            </Image>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={()=>go("Configura")}>
                            <Image style={style.icons}
                            source={Settings}>
                            </Image>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={()=>go("Perfil")}>
                            <Image style={style.icons}
                            source={Profile}>
                            </Image>
                        </TouchableOpacity>
                    </View>

                    
                </View>
        </>  
    );
}



                
       