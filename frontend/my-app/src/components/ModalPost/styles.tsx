import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#f9f9f9',
        borderRadius: 20,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#062E4F',
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#E6EDF3',
        borderRadius: 10,
        padding: 10,
        height: 100,
        textAlignVertical: 'top',
        color: '#062E4F',
    },
    charCount: {
        textAlign: 'right',
        color: '#7a8a99',
        fontSize: 12,
        marginBottom: 10,
    },
    imagePreview: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    imageButton: {
        flex: 1,
        backgroundColor: '#0D507D',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginRight: 5,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#7a8a99',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginRight: 5,
    },
    postButton: {
        flex: 1,
        backgroundColor: '#0D507D',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginLeft: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
    postButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});