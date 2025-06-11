import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
   
    boxCard:{
        width: '95%',
        height: 90,
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-around',
    },
    bola:{
        width: 52,
        height: 52,
        zIndex: 1
    },
    a1:{
        backgroundColor:'pink',
        borderWidth: 0,
    },
    t1:{
        width:'100%',
        backgroundColor:'purple',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#003049',
    },
    t2:{
        backgroundColor:'green',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#003049',
    },
    teste:{
        backgroundColor:'aqua',
        width: '46%',
        height: '42%',
        marginLeft: 25,
        marginBottom: 2
    }
})