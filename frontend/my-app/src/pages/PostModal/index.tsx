import React from 'react';
import {  View, Text, StyleSheet } from 'react-native';
import ModalPost from '../../components/ModalPost';
import { useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import { style } from './styles';

type RootStackParamList = {
    PostModal: { onAddPost: (content: string) => void };
};

type PotModalRouteProp = RouteProp<RootStackParamList, 'PostModal'>

export default function PostModal() {

    const navigation = useNavigation();
    const route = useRoute<PotModalRouteProp>();
    const { onAddPost } = route.params;

    const handlePost = (text: string) =>{
        onAddPost(text);
    };

    return (
        <View style={style.container}>
            <View style={style.modalCentro}>
                <ModalPost
                    visible={true}
                    onClose={() => navigation.goBack()} 
                    onPost={handlePost}
                />
            </View>
        </View>
    );
};