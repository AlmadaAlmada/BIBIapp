    import React, { useState } from 'react';
    import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
    import { style } from '../ModalPost/styles';

    type ModalPostProps = {
        visible: boolean;
        onClose: () => void;
        onPost: (text: string) => void;
    };

    const ModalPost: React.FC<ModalPostProps>  = ({ visible, onClose, onPost }: ModalPostProps) => {
        const [text, setText] = useState('');

        const handlePost = () => {
            if (text.trim() === '') return;
            onPost(text);
            setText('');
            onClose();
        };

        return (
            <Modal
                animationType="slide"
                transparent
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
                            <TouchableOpacity style={style.cancelButton} onPress={onClose}>
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
