import React, { useState } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';

import { style } from "./styles";

import Logo from '../../assets/logoGoogle.png'
import Camera from '../../assets/camera.png'
import Teste from '../../assets/teste.png'
import Plus from '../../assets/plus.png'

import Profile2 from '../../assets/profile2.png'
import { Input } from "../../components/Input";
import { Or } from "../../components/Or";
import { Google } from "../../components/Google";
import { Title } from "../../components/Title";
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { PostCard } from "../../components/PostCard";
import { Header } from "@react-navigation/stack";
import { BuscaTopo } from "../../components/BuscaTopo";



export default function Forum1() {

    const navigation = useNavigation<NavigationProp<any>>();



    return (
        <SafeAreaView style={style.container}>
            <View style={style.boxTop}>
                <BuscaTopo></BuscaTopo>
            </View>

            <View style={style.boxMid}>
                <ScrollView>
                    <PostCard
                        userName="Nome do usuário"
                        userImage={Profile2}
                        content="texto texto texto texto texto texto texto texto texto texto"
                        postImage={Teste}
                        comments={[
                            "texto texto texto texto texto texto texto texto texto",
                            "texto texto texto texto texto texto texto texto texto",
                        ]}
                    />

                    <PostCard
                        userName="Nome do usuário"
                        userImage={Profile2}
                        content="texto texto texto texto texto texto texto texto texto texto"
                        comments={["texto texto texto texto texto texto texto texto texto"]}
                    />
                </ScrollView>
            </View>

            <View style={style.boxBottom}>
                        <TouchableOpacity onPress={()=> navigation.navigate("PostModal") }>
                                            <Image style={style.plus}
                                            source={Plus}></Image>
                        </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
