import React, { useState, useEffect, useCallback } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { style } from "./styles";
import Plus from '../../assets/plus.png'
import { useNavigation, NavigationProp, useIsFocused, useFocusEffect } from '@react-navigation/native';
import { PostCard } from "../../components/PostCard";
import { BuscaTopo } from "../../components/BuscaTopo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { criarPostBff, listarTodosPostsBff, pesquisarPostsBff } from "../bff/forumBff";
import ModalPost from "../../components/ModalPost";

interface Post {
    id: string;
    autorId: string;
    texto: string;
    autorNome: string;
}



export default function Forum1() {
    const navigation = useNavigation<NavigationProp<any>>();
    const isFocused = useIsFocused();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [autorNome, setAutorNome] =  useState<string | null>(null);
    const [busca, setBusca] = useState("");

    useFocusEffect(
    useCallback(() => {
        const buscarAutorNome = async () => {
            const nome = await AsyncStorage.getItem('nomeUsuario');
            setAutorNome(nome || '');
        };
        buscarAutorNome();
            }, [])
    );

    const [uid, setUid] = useState<string | null>(null);

    useFocusEffect(
        useCallback(() => {
            const buscarUid = async () => {
                const uidSalvo = await AsyncStorage.getItem('uid');
                setUid(uidSalvo);
                console.log("CADE O ID DO DO DIVO Q PUBLICOU A MESAGEM?????", uidSalvo);
            };

            buscarUid();
        }, [])
    );

    const [idPostagem, setIdPostagem] = useState<string | null>(null);
     useFocusEffect(
        useCallback(() => {
            const buscarIdPostagem = async () => {
                const idPostagemSalvo = await AsyncStorage.getItem('idPostagem');
                setIdPostagem(idPostagemSalvo);
                console.log("CADE O ID DA POSTAGEMMM?????", idPostagemSalvo);
            };

            buscarIdPostagem();
        }, [])
    );

    const autorId = uid;

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await listarTodosPostsBff();
            if (response.sucesso && response.dados) {
                setPosts(response.dados);
            }
        } catch (error) {
            console.error("Erro ao buscar posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleNewPost = async (newPostContent: string) => {
        try {

            if (!autorId ) {
                console.error("Usuário não autenticado.");
                return;
            }

            const resposta = await criarPostBff(autorId, newPostContent);

            if (resposta.sucesso && resposta.post) {
                setPosts(prev => [resposta.post, ...prev]);
            } else {
                console.error("Erro ao criar post:", resposta.mensagem);
            }

            setModalVisible(false);
        } catch (error) {
            console.error("Erro no handleNewPost:", error);
        }
    };

    React.useEffect(() => {
        if (isFocused) {
            fetchPosts();
        }
    }, [isFocused]);

        const handleBusca = async (texto: string) => {
        setBusca(texto);
        if (!texto.trim()) {
            fetchPosts(); 
            return;
        }

        try {
            const resultado = await pesquisarPostsBff(texto);
            if (resultado.sucesso && resultado.dados) {
                setPosts(resultado.dados);
            } else {
                setPosts([]);
            }
        } catch (error) {
            console.error("Erro ao buscar posts:", error);
        }
    };

    return (
        <SafeAreaView style={style.container}>
            <View style={style.boxTop}>
                <BuscaTopo onBuscar={handleBusca} />
            </View>

            <View style={style.boxMid}>
                <ScrollView>
                    {posts.map((post) => (
                        <PostCard
                            key={post.id}
                            userName={post.autorNome}
                            content={post.texto}
                        />
                    ))}
                </ScrollView>
            </View>

            <View style={style.boxBottom}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Image style={style.plus} source={Plus} />
                </TouchableOpacity>
            </View>

            <ModalPost
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onPost={handleNewPost}
            />
        </SafeAreaView>
    );
}
