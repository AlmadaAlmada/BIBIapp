import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";
import { Input } from "../../components/Input";

export const style = StyleSheet.create({
     container: {
        flex: 1,
    },
    boxTop: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 50,
    },
       buttonTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 30,          
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
        alignSelf:'center', 
    },
    pageSubtitle: {
        fontSize: 20,
        fontWeight: '700',
        color: themas.colors.primary,
        marginVertical: 20, 
    },
    inputGroup: {
        width: '100%',
        marginBottom: 20,
        alignSelf:'stretch',
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333', 
        marginBottom: 5,
    },
    boxMid: {
        width: '100%',
        paddingHorizontal: 10,
    },
    boxBottom: {
        width: '100%',
    },
    boxButton: {
        flexDirection: 'row',
        columnGap: 30,
    },
    button: {
        backgroundColor: themas.colors.primary,
        borderRadius: 14,
        padding: 10,
        paddingRight: 134,
        paddingLeft: 134
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