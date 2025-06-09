import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { style } from '../ModalPost/styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';

type ModalPostProps = {
  visible: boolean;
  onClose: () => void;
  onSendPost: (data: { text: string; image: string | null }) => void;
  autorId: string | null;
  autorNome: string | null;
};

const ModalPost = ({ visible, onClose, onSendPost, autorId, autorNome }: ModalPostProps) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    onSendPost({ text, image });
    setText('');
    setImage(null);
    onClose();
  };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={style.modalOverlay}>
                <View style={style.modalContainer}>
                    <Text style={style.title}>Criar Publicação</Text>

                    <TextInput
                        style={style.input}
                        placeholder="Escreva algo..."
                        multiline
                        maxLength={300}
                        value={text}
                        onChangeText={setText}
                        placeholderTextColor="#7a8a99"
                    />
                    <Text style={style.charCount}>{text.length}/300</Text>

                    {image && (
                        <Image source={{ uri: image }} style={style.imagePreview} />
                    )}

                    <View style={style.buttonRow}>
                        <TouchableOpacity style={style.imageButton} onPress={pickImage}>
                            <Text style={style.buttonText}>Adicionar Imagem</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={style.buttonRow}>
                        <TouchableOpacity style={style.cancelButton} onPress={() => navigation.goBack()}>
                            <Text style={style.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.postButton}
                            onPress={handlePost}
                            disabled={text.trim() === ''}
                        >
                            <Text style={style.postButtonText}>Publicar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default ModalPost;