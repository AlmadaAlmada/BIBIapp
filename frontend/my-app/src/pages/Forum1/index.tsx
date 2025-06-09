import React, { useState, useCallback, useEffect } from "react";

import { Text, View, Image, TextInput, Button, TouchableOpacity, Alert, ScrollView, SafeAreaView, RefreshControl } from 'react-native';

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
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { PostCard } from "../../components/PostCard";
import { Header } from "@react-navigation/stack";
import { BuscaTopo } from "../../components/BuscaTopo";
import ModalPost from "../../components/ModalPost";
import { listarPosts, createPost } from "../bff/forumBff";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Forum1() {

    const navigation = useNavigation<NavigationProp<any>>();
    const [posts, setPosts] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [autorId, setAutorId] = useState<string | null>(null);
    const [autorNome, setAutorNome] = useState<string | null>(null);

    useEffect(() => {
        const loadUserData = async () => {
            const storedUid = await AsyncStorage.getItem('uid');
            const storedNome = await AsyncStorage.getItem('nome');
            setAutorId(storedUid);
            setAutorNome(storedNome);
            console.log("Dados do usuário carregados no Forum1:", { uid: storedUid, nome: storedNome });
        };
        loadUserData();
    }, []);

    const fetchPosts = async () => {
        setRefreshing(true);
        try {
            const result = await listarPosts();
            if (result.sucesso) {
                setPosts(result.dados);
            } else {
                Alert.alert("Erro", result.mensagem || "Não foi possível carregar os posts.");
            }
        } catch (error) {
            console.error("Erro ao buscar posts:", error);
            Alert.alert("Erro", "Ocorreu um erro ao carregar as postagens. Tente novamente.");
        } finally {
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchPosts();
        }, [])
    );

    const handleOpenModal = () => {
        if (!autorId || !autorNome) {
            Alert.alert("Erro", "Não foi possível carregar os dados do usuário. Tente fazer login novamente.");
            return;
        }
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handlePostCreated = async (data: { text: string; image: string | null }) => {
        if (!autorId || !autorNome) {
            Alert.alert("Erro", "Dados do usuário não disponíveis para criar a postagem.");
            return;
        }

        try {
            const result = await createPost(autorId, autorNome, data.text); // Chame a função createPost
            if (result.sucesso) {
                Alert.alert("Sucesso", "Postagem criada com sucesso!");
                fetchPosts(); // Recarrega a lista de posts
            } else {
                Alert.alert("Erro", result.mensagem || "Não foi possível criar a postagem.");
            }
        } catch (error) {
            console.error("Erro ao criar postagem:", error);
            Alert.alert("Erro", "Ocorreu um erro ao criar a postagem. Tente novamente.");
        } finally {
            handleCloseModal(); // Fecha o modal após tentar criar a postagem
        }
    };


    return (
        <SafeAreaView style={style.container}>
            <View style={style.boxTop}>
                <BuscaTopo />
            </View>

            <View style={style.boxMid}>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={fetchPosts} />
                    }
                >
                    {posts.length > 0 ? (
                        posts.map((post: any) => (
                            <PostCard
                                key={post.id}
                                userName={post.autorNome}
                                userImage={Profile2}
                                content={post.texto}
                                postImage={post.imagemUrl || null}
                                comments={post.comentarios?.map((comment: any) => comment.texto) || []}
                            />
                        ))
                    ) : (
                        <Text style={style.noPostsText}>
                            Nenhuma postagem encontrada. Seja o primeiro a postar!
                        </Text>
                    )}
                </ScrollView>
            </View>

            <View style={style.boxBottom}>
                <TouchableOpacity onPress={handleOpenModal}>
                    <Image style={style.plus} source={Plus} />
                </TouchableOpacity>
            </View>

            {autorId && autorNome && ( // Renderiza o modal apenas se os dados do usuário estiverem disponíveis
                <ModalPost
                    visible={isModalVisible}
                    onClose={handleCloseModal}
                    onSendPost={handlePostCreated}
                    autorId={autorId}
                    autorNome={autorNome}
                />
            )}
        </SafeAreaView>
    );
}
