import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themas.colors.secondary,
    },
    boxTop:{
        flex: 1,
        width: '100%',
        //height: Dimensions.get('window').height/2.0,
        backgroundColor: themas.colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    boxMid:{
        flex: 1,
        width: '100%',
        //height: Dimensions.get('window').height/2.1,
        backgroundColor: themas.colors.secondary,
        alignItems: 'center',
        rowGap: 12
    },
    boxBottom:{
        flex: 1,
        width: '100%',
    },
    boxCores:{
        marginBottom: 50,
        flexDirection: 'row',
    },
    foto:{
        objectFit:'contain',
        marginTop: 40,
        width: '100%',
        height: 274
    },
    logo3:{
       width: 50,
        height: 50,
        position: 'absolute',
        left: '47.5%',
        top: 0,
        transform: [{ translateX: -25 }],
        zIndex: 2,
    },
    bola:{
        width: 52,
        height: 52,
        zIndex: 1
    },
    linhas:{
        marginTop: 20,
        color: 'gray',
        fontWeight: 'bold'
    },
    scroll:{
        flexGrow: 1,
        width: '100%',
        height: '100%',
        marginLeft: 20,
        flexDirection: 'column',
        columnGap: 100,

    },
    formata:{
        flexDirection: 'column',
        rowGap: 10
    }
})