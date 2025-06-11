import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({

     header:{
        width: '100%',
        backgroundColor: themas.colors.primary,
        color: themas.colors.primary,
        tintColor: themas.colors.secondary,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        top: 30,
        gap: 13,
        
    },
    backButton:{
        left: 10,
        position: 'absolute'

    },
    backText:{
        left: -80,
    },
    back:{
        width: 35,
        height: 35
    },
    textoAba:{
         fontWeight: 'bold',
        fontSize: 22,
        color: 'white'
    }
})