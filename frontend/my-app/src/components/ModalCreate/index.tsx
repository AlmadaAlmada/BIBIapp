import React, { forwardRef, useState, LegacyRef, useEffect } from "react";
import { 
    Text, 
    View, 
    Image, 
    TextInput, 
    Button, 
    TouchableOpacity, 
    Alert, 
    TextInputProps, 
    ImageSourcePropType, 
    Modal,
    ScrollView,
    Platform
} from 'react-native';
import { style } from "../ModalCreate/styles";
import { BlurView } from 'expo-blur';
import DateTimePicker from '@react-native-community/datetimepicker';

import Bola from '../../assets/bola.png'
import Delete from '../../assets/delete.png'
import Teste from '../../assets/teste.png'
import Close from '../../assets/close.png'
import Calendar from '../../assets/calendar.png'
import DownArrow from '../../assets/downArrow.png'
import Logo from '../../assets/logoGoogle.png'
import Logo2 from '../../assets/logoApple.png'

import { MaterialIcons, FontAwesome, Octicons } from '@expo/vector-icons';
import { Input } from "../Input";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cadastrarAlerta, obterPecasDisponiveis } from "../../pages/bff/alertaBff";

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
    visible?: boolean,
    imageLeft?: ImageSourcePropType,
    imageRight?: ImageSourcePropType,
    imageLeftStyle?: object,
    imageRightStyle?: object,
    onIconLeftPress?: () => void,
    onIconRightPress?: () => void
}

export const ModalCreate = forwardRef((Props: Props, ref: LegacyRef<TextInput> | null) => {
    const { title = "Produto", subtitle = "Próxima troca: XX/XX", subtitle2 = "Última troca: XX/XX", bottomText = "Estado Vazio", imageLeft, imageRight, imageLeftStyle, imageRightStyle, ...rest } = Props

    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    // Estados para os dados do alerta
    const [idCarro, setidCarro] = useState<string | null>(null);
    const [peca, setPeca] = useState('');
    const [data, setData] = useState(new Date());
    const [dataTexto, setDataTexto] = useState('');
    const [uid, setUid] = useState<string | null>(null);

    // Estados para as peças disponíveis
    const [pecasDisponiveis, setPecasDisponiveis] = useState<string[]>([]);
    const [showPecasDropdown, setShowPecasDropdown] = useState(false);

    // Estados para o DatePicker
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Buscar dados do AsyncStorage
    useEffect(() => {
        const buscarDados = async () => {
            const idCarroSalvo = await AsyncStorage.getItem('idCarro');
            const uidSalvo = await AsyncStorage.getItem('uid');
            setidCarro(idCarroSalvo);
            setUid(uidSalvo);
        };
        buscarDados();
    }, []);

    // Buscar peças disponíveis
    useEffect(() => {
        const buscarPecas = async () => {
            try {
                const response = await obterPecasDisponiveis();
                if (response.sucesso) {
                    setPecasDisponiveis(response.pecas);
                }
            } catch (error) {
                console.error('Erro ao buscar peças:', error);
                Alert.alert('Erro', 'Não foi possível carregar as peças disponíveis');
            }
        };
        buscarPecas();
    }, []);

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

    const selecionarPeca = (pecaSelecionada: string) => {
        setPeca(pecaSelecionada);
        setShowPecasDropdown(false);
    };

    const salvarAlerta = async () => {
        if (!peca || !dataTexto) {
            Alert.alert('Atenção', 'Todos os campos devem estar preenchidos!');
            return;
        }

        // console.log('Dados antes do cadastro:', {
        //     uid,
        //     idCarro,
        //     peca,
        //     data: dataTexto,
        // });

        try {
            const resposta = await cadastrarAlerta(uid!, idCarro!, peca, dataTexto);

            if (resposta.sucesso) {
                Alert.alert('Sucesso!', resposta.mensagem, [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack()
                    }
                ]);
                
            } else {
                Alert.alert('Erro', resposta.mensagem);
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível salvar o alerta');
        }
    };

    return (
        <>
            <Modal visible={true} transparent animationType="slide">
                <View style={style.modal2}>
                    <View style={style.boxCard}>
                        <View style={style.A1}>
                            <View style={style.a1}>
                                <Text style={style.t0}>Novo Alerta</Text>
                            </View>
                            <View style={style.a2}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Image style={style.close} source={Close} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={style.A2}>
                            <View style={style.b1}>
                                {/* Seleção de Peça */}
                                <View>
                                    <Text style={style.t1}>Selecione uma peça</Text>
                                    <TouchableOpacity onPress={() => setShowPecasDropdown(!showPecasDropdown)}>
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
                                                color: peca ? '#000' : '#999',
                                                fontSize: 16
                                            }}>
                                                {peca || 'Selecionar'}
                                            </Text>
                                            <Image style={style.downArrow} source={DownArrow} />
                                        </View>
                                    </TouchableOpacity>

                                    {showPecasDropdown && (
                                        <View style={{
                                            backgroundColor: 'white',
                                            borderRadius: 8,
                                            marginTop: 5,
                                            maxHeight: 200,
                                            borderWidth: 1,
                                            borderColor: '#ddd',
                                            elevation: 3,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,
                                        }}>
                                            <ScrollView>
                                                {pecasDisponiveis.map((pecaItem, index) => (
                                                    <TouchableOpacity
                                                        key={index}
                                                        style={{
                                                            padding: 15,
                                                            borderBottomWidth: index < pecasDisponiveis.length - 1 ? 1 : 0,
                                                            borderBottomColor: '#eee'
                                                        }}
                                                        onPress={() => selecionarPeca(pecaItem)}
                                                    >
                                                        <Text style={{ fontSize: 16, color: '#333' }}>
                                                            {pecaItem}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </ScrollView>
                                        </View>
                                    )}
                                </View>

                                {/* Seleção de Data */}
                                <View >
                                    <Text style={style.t1}>Última troca</Text>
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

                        <View>
                            <View>
                                <TouchableOpacity style={style.button} onPress={salvarAlerta}>
                                    <View>
                                        <Text style={style.criar}>Concluído</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
});