import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themas.colors.secondary,
    },
    boxTop: {
        height: Dimensions.get('window').height * 0.12,
        width: '100%',
        backgroundColor: themas.colors.primary,
        justifyContent: 'flex-end',
        paddingBottom: 15,
    },
    boxMid: {
        flex: 1,
        width: '100%',
        backgroundColor: themas.colors.secondary,
        justifyContent: 'space-evenly',
        paddingTop: 20,
        alignItems: 'center',
        padding: 20,
    },
    abaixa: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'white',
        overflow: 'hidden',
                elevation: 5,
    },
    btn: {
        width: '100%',
        shadowColor: '#000',
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
    }
})