import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
   
    boxCard:{
        width: '97%',
        height: 70,
        minWidth: '97%',
        minHeight: 70,
        maxWidth: '97%',
        maxHeight: 70,
        backgroundColor: 'white',
        zIndex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    bola:{
        width: 40,
        height: 40,
        resizeMode:'contain',
    },
    a1:{
        width: 60,
        height: 70,
        justifyContent:'center',
        alignItems:'center'
    },
    a2:{
        alignSelf: 'center',
    },
    t1:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#003049',
    },
    t2:{
        fontWeight: 'bold',
        fontSize: 22,
        color: '#003049',
    },
    teste:{
        width: '46%',
        height: '42%',
        //marginLeft: 25,
        //marginBottom: 2
    },
    fixImage:{
        backgroundColor:'aquablue',
    },
    esquerda:{
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    }
})