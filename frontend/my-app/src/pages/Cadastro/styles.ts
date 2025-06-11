import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";
import { Input } from "../../components/Input";

export const style = StyleSheet.create({
     container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    boxTop: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 40,
    },
    buttonTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 30,
    },
    backIcon: {
        width: 30,
        height: 24,
    },
    appTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: themas.colors.primary,
        flex: 1,
        textAlign: 'center',
        marginRight: 40,
        alignSelf: 'center',
    },
    pageSubtitle: {
        fontSize: 20,
        fontWeight: '700',
        color: themas.colors.primary,
        marginVertical: 20,
    },
    inputGroup: {
        width: '95%',
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        left: 10,
    },
    boxMid: {
        width: '100%',
        marginTop:'15%',
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    boxBottom: {
        width: '100%',
    },
    boxButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: themas.colors.primary,
        borderRadius: 14,
        padding: 10,
        paddingVertical: 12,
        paddingHorizontal: '30%',
    },
    criar: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        paddingLeft: 10
    },
    criar2: {
        fontWeight: 'bold',
        fontSize: 16,
        color: themas.colors.primary
    },
    boxTermo: {
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 30
    },
    termo: {
        color: 'black',
        fontStyle: 'italic'
    }
})