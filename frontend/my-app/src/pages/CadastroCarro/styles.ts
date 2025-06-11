import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: themas.colors.secondary
    },
    boxTop: {
        width: '100%',
        height: '12%',
        backgroundColor: themas.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxMid: {
        marginTop:10,
        width: '95%',
    },
    boxButton: {
        flexDirection: 'row',
        columnGap: 30,
        width: '100%',
        height: '8%',
        backgroundColor: themas.colors.secondary,
    },
    button: {
        borderWidth: 1.5,
        backgroundColor: themas.colors.primary,
        borderRadius: 14,
        padding: 10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    criar: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        alignSelf: 'center'

    },
    scroll: {
        flexGrow: 1,
        flexDirection: 'column',
        rowGap: 10
    },
    done: {
        paddingHorizontal: 17,
        marginTop: 20,
    },
    criar2: {
        fontWeight: 'bold',
        fontSize: 16,
        color: themas.colors.primary
    },
    apelido: {
        alignSelf: 'center',
        width: '100%',
        marginTop: 15,
        gap: 15,
        flexDirection: 'column'
    },

    apelido2: {
        alignSelf: 'center',
        width: '100%', 
        marginTop: 10, 
        flexDirection: 'column',
    },
    subTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#003049',
        alignSelf: 'flex-start',

    },
    acima: {
        marginLeft: 20,
    }
})