import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    modal2:{
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex:0.8,   
    },
    boxCard:{
        width: '95%',
        height: 340,
        backgroundColor: 'rgb(135, 159, 171)',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
        A1: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    A2: {
        justifyContent: 'center',
        alignItems: 'stretch',
        width: '90%',
        height: 200,  
    },
    a1:{
        flexDirection: 'column',
        left: 23,
    },
    a2:{
        left: 100,
        bottom:20,
    },
    b1:{
        gap: 15
    },
    t0:{
        fontWeight: 'bold',
        fontSize: 20,
        color: themas.colors.primary,
    },
    t1:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#003049',
    },
    t2:{
        fontWeight: 'bold',
    },
    close:{
        width: 28,
        height: 28.2,
        marginTop: 10, 
    },
    button:{
        borderWidth: 1.5,
        backgroundColor: themas.colors.primary,
        borderRadius: 14,
        padding: 10,
        paddingRight: 45,
        paddingLeft: 45
    },
    criar:{
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        paddingLeft: 10
    },
    blurContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendar:{
        width: 24,
        height: 24,
        left: 285,
        top: -32.5
    },
    downArrow:{
        width: 24,
        height: 24,
        left: 285,
        top: -32.5
    }
})