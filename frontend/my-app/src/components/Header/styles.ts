import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({

     header: {
        width: '100%',
        height: '100%',
        backgroundColor: themas.colors.primary,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        bottom: 10,
        zIndex: 1,
    },
    backText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 0,
        marginRight: 0,
    },
    back: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    textoAba: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'white',
    }
})