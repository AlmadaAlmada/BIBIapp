import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container: {
        width: '100%', // provavelmente quis dizer isso, não "with:10"
        flex: 0.5,
        justifyContent: 'flex-start',
    },
    BoxTop: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    BoxMid: {
        width: '100%',
        alignItems: 'center',
    },
    inputGroup: {
        minWidth:'90%',
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        left: 10,
    },
    boxButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: themas.colors.primary,
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: '30%',
    },
    criar: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        paddingLeft: 10
    }

})