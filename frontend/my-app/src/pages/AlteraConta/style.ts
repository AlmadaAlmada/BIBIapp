import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const style = StyleSheet.create({
    container: {
        width: '100%',
        flex: 0.1,
        justifyContent: 'flex-start',
        backgroundColor:themas.colors.primary,
        
    },
    BoxTop: {
        backgroundColor:themas.colors.primary,
        width: '100%',
        top:'20%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    BoxMid: {
        width: '100%',
        top:'40%',
        paddingHorizontal: 10,
    },
    inputGroup: {
        width: '95%',
        alignSelf: 'center',
        marginTop: '10%',
        marginBottom: 20,
    },
    inputLabel: {
        width:'100%',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        left: 10,
    },
    boxButton: {
        alignSelf: 'center',
        marginTop:'15%',
    },
    button: {
        backgroundColor: themas.colors.primary,
        borderRadius: 14,
        padding: 10,
        paddingVertical: 12,
        paddingHorizontal: '32%',
    },
    criar: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        paddingLeft: 10
    }
})