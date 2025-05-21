import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
   
    boxCard:{
        width: '95%',
        height: 90,
        backgroundColor: 'white',
        zIndex: 2,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        columnGap: 25,
    },
    bola:{
        width: 52,
        height: 52,
        zIndex: 1
    },
    a1:{
        borderColor: '',
        borderWidth: 0,
    },
    t1:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#003049',
    },
    t2:{
        fontWeight: 'bold',
        fontSize: 15,
        color: '#003049',
    },
    teste:{
        width: '46%',
        height: '42%',
        marginLeft: 25,
        marginBottom: 2
    }


})