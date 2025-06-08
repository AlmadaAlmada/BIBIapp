import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { style } from '../ModalPost/styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';

type ModalPostProps = {
  visible: boolean;
  onClose: () => void;
  onPost: (data: { text: string;}) => void;
};

const ModalComent = ({ visible, onClose, onPost }: ModalPostProps) => {
  const [text, setText] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handlePost = () => {
    onPost({ text });
    setText('');
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

                    <View style={style.buttonRow}>
                        <TouchableOpacity style={style.cancelButton} onPress={() => navigation.goBack()}>
                            <Text style={style.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.postButton}
                            onPress={handlePost}
                            disabled={text.trim() === ''}
                        >
                            <Text style={style.postButtonText}>Comentar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ModalComent;