import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({

     header:{
        flex: 1,
        width: '100%',
        height: '60%',
        backgroundColor: themas.colors.primary,
        //backgroundColor: themas.colors.primary,
        //color: themas.colors.primary,
        //tintColor: themas.colors.secondary,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 3,
        paddingHorizontal: 20,
    },
    backButton:{
        marginRight: 12,
        position: 'absolute',
        marginTop: 15
        //borderWidth: 3,

    },
    backText:{
        alignItems: 'center',
        marginTop: 28
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