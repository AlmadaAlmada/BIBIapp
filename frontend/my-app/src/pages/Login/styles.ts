import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container: {
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxTop: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxMid: {
        width: '100%',
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    inputGroup: {
        width: '95%', 
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
        left: 10,
    },
    boxBottom: {
        flex: 1,
        width: '100%',
    },
    boxButton: {
        top: 25,
        paddingTop: '10%',
        flexDirection: 'row',
        columnGap: 30,
        justifyContent: 'center',
    },
    button: {
        borderWidth: 1.5,
        backgroundColor: themas.colors.primary,
        borderRadius: 14,
        padding: 10,
        paddingRight: 45,
        paddingLeft: 45
    },
    button2: {
        borderWidth: 1.5,
        borderColor: themas.colors.primary,
        backgroundColor: 'white',
        borderRadius: 14,
        padding: 10,
        paddingRight: 38,
        paddingLeft: 38
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
    }
})