import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
   
    boxModal:{
        width: 20,
        height: 20,
        borderColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    modal:{
        width: 50,
        height: 50,
        backgroundColor: 'purple',
        borderColor: 'rgba(0,0,0,0.5)',
        color: 'black',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
        
    },
    boxCard:{
        marginLeft: 2,
        width: '95%',
        height: 340,
        backgroundColor: '#ffff',
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        columnGap: 45,
        rowGap: 25
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
        width: '90%',
        marginTop: 6,
        marginBottom: 10
    },
    a1:{
        left: 20,
    },
    a2:{
        flexDirection: 'column',
        left: 100,
        top: -30
    },
    b1:{
        flexDirection: 'column',
    },
    t0:{
        alignSelf:'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#003049',
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
    delete:{
        width: 42,
        height: 53,
        marginTop: 30,     
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

      


})