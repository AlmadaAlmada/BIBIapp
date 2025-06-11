import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    //card da tela de alertas
    boxCard: {
        width: '95%',
        height: 90,
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    peca: {
        height: '100%',
        justifyContent: 'center',
        marginLeft: 10,
        width: 65,
    },
    data: {
        marginLeft: 20,
    },
    a1: {
        marginLeft: 60,
        alignItems: 'center',
    },
    t1: {
        width: '100%',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#003049',
    },
    t2: {
        top: 2,
        fontWeight: 'bold',
        fontSize: 15,
        color: '#003049',
    },
    teste: {
        objectFit:'contain',
        width: 40,
    },
})