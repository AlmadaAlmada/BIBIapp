import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themas.colors.secondary,
    },
    boxTopzao:{
        height: '8%',
        backgroundColor: 'red',
        zIndex: 2
    },
    boxTop:{
        flex: 1,
        width: '100%',
        backgroundColor: themas.colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxMid:{
        width: '100%',
        height: '10%',
        backgroundColor: themas.colors.secondary,
        alignItems: 'center',
        rowGap: 12,
        justifyContent: 'center',
      
    },
    boxBottom:{
        width: '100%',
        height: '8%',
        backgroundColor: 'white', 
    },
    scroll:{
        width: '100%',
        alignSelf: 'center',
        marginLeft: '5%',
        flexDirection: 'column',
      
    },
    formata:{
        flexDirection: 'column',
        gap: 10,
    },
    plus:{
        width: 60,
        height: 60,
        alignSelf: 'flex-end'
    }
})