import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
   
    modal:{
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderColor: 'rgba(0,0,0,0.5)',
        color: 'transparent',
        
    },
    modal2:{
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200,
        
    },
    boxCard:{
        marginTop:0,
        marginLeft: 0,
        width: '95%',
        height: 340,
        backgroundColor: 'rgb(135, 159, 171)',
        zIndex: 2,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        columnGap: 45,
        rowGap: 22
    },
    bola:{
        width: 72,
        height: 72,
        zIndex: 1
    },
    A1:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
    },
    A2:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: 200,
        marginLeft: 25,
        marginTop: 2,
        marginBottom: -55,
        backgroundColor: ''
    },
    A3:{
        marginTop: 2
    },
    a1:{
        flexDirection: 'column',
        left: 23,
        bottom: -5,
        
    },
    a2:{
        flexDirection: 'column',
        left: 120,
        top: -30
    },
    b1:{
        marginLeft: 20,
        flexDirection: 'column',
        gap: 15
    },
    b2:{
        backgroundColor: '',
        top: -10
    },
    b22:{
        top: -24
    },
    c1:{

    },
    t0:{
        fontWeight: 'bold',
        fontSize: 20,
        color: themas.colors.primary,
        marginLeft: -10,
        marginTop: 0
    },
    t1:{
        fontWeight: 'bold',
        fontSize: 16,
        color: '#003049',
    },
    t2:{
        fontWeight: 'bold',
        fontSize: 13,
        color: 'black',
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