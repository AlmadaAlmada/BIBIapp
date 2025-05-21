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
        justifyContent: 'center',
        alignContent: 'center',
        columnGap: 1,
        borderRadius: 15,
        borderBottomWidth: 3,
        borderColor: themas.colors.primary
    },
    bola:{
        width: 40,
        height: 40,
        zIndex: 1
    },
    a1:{
        width: 60,
        height: 20,
        //borderColor: 'red',
        //borderWidth: 3,
        marginTop: 10
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
    backText:{
        left: -80,
    },
    fixImage:{
        top: -15,
        position: 'absolute',
    },
    esquerda:{
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    }


})