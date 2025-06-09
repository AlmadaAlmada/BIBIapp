import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({

     header:{
        width: '100%',
        height: '60%',
        backgroundColor: themas.colors.primary,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
    },
    backButton:{
        marginRight: 12,
    },
    backText:{

    },
    back:{
        width: 35,
        height: 35,
        resizeMode: 'contain',

    },
    textoAba:{
        fontWeight: 'bold',
        fontSize: 22,
        color: 'white',
        paddingLeft: 25,
        marginBottom: 20
    }
})