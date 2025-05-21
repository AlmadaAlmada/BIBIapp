import React, { useState } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, ScrollView } from 'react-native';

import { style } from "./styles";

import Foto from '../../assets/1.png'
import Logo3 from '../../assets/fiat2.png'
import Bola from '../../assets/bola.png'
import Teste from '../../assets/teste.png'
import { Card } from "../../components/Card";


export default function Inicial() {


    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                    <Image style={style.foto}
                    source={Foto}></Image>
                <View style= {style.boxCores}>
                    <Text style= {style.linhas}> ────────────────  </Text>     
                    <Image style={style.logo3}
                    source={Logo3}>
                    </Image>
                    <Image style={style.bola}
                        source={Bola}></Image>
                    //<Text style= {style.linhas}>  ─────────────────</Text>
                </View>
            </View>
            <View style={style.boxMid}>
                <ScrollView style= {style.scroll}>
                    
                    <View style={style.formata}>
                        <Card  
                            imageLeft={Bola}
                            title="Produto"
                            subtitle="Próxima troca: XX/XX"
                            subtitle2="Última troca: XX/XX"
                            imageRight={Teste}
                            bottomText="Estado Vazio">

                        </Card>

                        <Card  
                            imageLeft={Bola}
                            title="Produto"
                            subtitle="Próxima troca: XX/XX"
                            subtitle2="Última troca: XX/XX"
                            imageRight={Teste}
                            bottomText="Estado Vazio">

                        </Card>

                        <Card  
                            imageLeft={Bola}
                            title="Produto"
                            subtitle="Próxima troca: XX/XX"
                            subtitle2="Última troca: XX/XX"
                            imageRight={Teste}
                            bottomText="Estado Vazio">

                        </Card>

                        <Card  
                            imageLeft={Bola}
                            title="Produto"
                            subtitle="Próxima troca: XX/XX"
                            subtitle2="Última troca: XX/XX"
                            imageRight={Teste}
                            bottomText="Estado Vazio">

                        </Card>

                        <Card  
                            imageLeft={Bola}
                            title="Produto"
                            subtitle="Próxima troca: XX/XX"
                            subtitle2="Última troca: XX/XX"
                            imageRight={Teste}
                            bottomText="Estado Vazio">

                        </Card>
                    </View>
                </ScrollView>

            </View>

            
        </View>
    );
}
