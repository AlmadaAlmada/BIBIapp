
import React, { forwardRef, useState, LegacyRef, useEffect } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, TextInputProps, ImageSourcePropType, Modal, Platform } from 'react-native';

import { BlurView } from 'expo-blur';


import { style } from "../ModalEdit/styles";

import Bola from '../../assets/bola.png'
import Delete from '../../assets/delete.png'
import Teste from '../../assets/teste.png'
import Calendar from '../../assets/calendar.png'

import Logo from '../../assets/logoGoogle.png'
import { useAlertas } from '../../pages/AlertaContext'; // certifique-se que está importado


import Logo2 from '../../assets/logoApple.png'
import DateTimePicker from '@react-native-community/datetimepicker';

import { MaterialIcons, FontAwesome, Octicons } from '@expo/vector-icons';
import { Input } from "../Input";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/core";
import { buscarAlertaPorIdBff, editarAlertaBff, excluirAlertaBff } from "../../pages/bff/alertaBff";
import AsyncStorage from "@react-native-async-storage/async-storage";

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> |
    React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
    React.ComponentType<React.ComponentProps<typeof Octicons>>;

type Props = TextInputProps & {
    idAlerta: string;
    idCarro: string;
    uid: string;
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


export const ModalEdit = forwardRef((props: Props, ref: LegacyRef<TextInput> | null) => {

    const { setAlertas } = useAlertas();

    const [alerta, setAlerta] = useState<any>(null);

    const [data, setData] = useState(new Date());
    const [dataTexto, setDataTexto] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {

        const buscarAlertaPorId = async () => {
            try {
                const resposta = await buscarAlertaPorIdBff(uid, idCarro, idAlerta);
                setAlerta(resposta.alerta); // Aqui você já torna "global"

            } catch (error) {
                Alert.alert('Erro', 'Não foi possível salvar o carro')
            }
        }

        buscarAlertaPorId();
    }, []);

    useEffect(() => {
        if (alerta) {
        
        }
    }, [alerta]);

    const editarAlerta = async () => {

        try {
            const resposta = await editarAlertaBff(uid, idCarro, idAlerta, dataTexto);

            if (resposta.sucesso) {
                Alert.alert('Sucesso!', resposta.mensagem, [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('BottomRoutes')
                    }
                ]);

                navigation.goBack()
            } else {
                Alert.alert('Erro', resposta.mensagem);
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível editar o alerta')
        }
    }

     const excluirAlerta = async () => {

        try {
            const resposta = await excluirAlertaBff(uid, idCarro, idAlerta);

            if (resposta.sucesso) {
                setAlertas([]);
                Alert.alert('Sucesso!', resposta.mensagem, [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('BottomRoutes')
                    }
             
                ]);

                
                //navigation.goBack()
            } else {
                Alert.alert('Erro', resposta.mensagem);
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir o alerta')
        }
    }

     const formatarData = (date: Date): string => {
        const dia = date.getDate().toString().padStart(2, '0');
        const mes = (date.getMonth() + 1).toString().padStart(2, '0');
        const ano = date.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || data;
        setShowDatePicker(Platform.OS === 'ios');
        setData(currentDate);
        setDataTexto(formatarData(currentDate));
    };


    const {
        idAlerta,
        idCarro,
        uid,
    } = props;

    const { title = "Produto", subtitle = "Próxima troca: XX/XX", subtitle2 = "Última troca: XX/XX", bottomText = "Estado Vazio", imageLeft, imageRight, imageLeftStyle, imageRightStyle, ...rest } = props

    const navigation = useNavigation<NativeStackNavigationProp<any>>();



    return (
        <>
            <View style={style.boxModal}>
                <Modal transparent animationType="fade" style={style.modal}>
                    <BlurView intensity={100} tint="regular" style={style.blurContainer}>
                        <View style={style.boxCard}>
                            <View style={style.A1}>
                                <View style={style.a1}>
                                    <Image style={style.bola}
                                        source={Bola}></Image>
                                    <Text style={style.t0}>{alerta?.peca}</Text>
                                </View>

                                <View style={style.a2}>
                                    <TouchableOpacity onPress={excluirAlerta}>
                                        <Image style={style.delete}
                                            source={Delete}></Image>
                                    </TouchableOpacity>
                                </View>

                            </View>

                            <View style={style.A2}>
                                <View style={style.b1}>
                                    <Text style={style.t1}>Última troca</Text>
                                    <View style={style.b2}>
                                        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                        <View style={{
                                            backgroundColor: 'white',
                                            borderRadius: 8,
                                            padding: 15,
                                            borderWidth: 1,
                                            borderColor: '#ddd',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{
                                                color: dataTexto ? '#000' : '#999',
                                                fontSize: 16
                                            }}>
                                                {dataTexto || 'DD/MM/AAAA'}
                                            </Text>
                                            <Image style={style.calendar} source={Calendar} />
                                        </View>
                                    </TouchableOpacity>

                                    {showDatePicker && (
                                        <DateTimePicker
                                            value={data}
                                            mode="date"
                                            display="default"
                                            onChange={onDateChange}
                                            maximumDate={new Date()}
                                        />
                                    )}
                                    </View>
                                </View>
                            </View>

                            <View style={style.A3}>
                                <View style={style.c1}>
                                    <TouchableOpacity style={style.button} onPress={editarAlerta}>
                                        <View>
                                            <Text style={style.criar}>Concluído</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>
                    </BlurView>
                </Modal>
            </View>
        </>
    )
});




