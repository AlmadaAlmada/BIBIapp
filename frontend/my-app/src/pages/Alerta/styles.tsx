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
        height: Dimensions.get('window').height/11,
        backgroundColor: 'red',
        zIndex: 2
    },
    boxTop:{
        width: '100%',
        height: Dimensions.get('window').height/1.3,
        backgroundColor: themas.colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    boxMid:{
        width: '100%',
        height: Dimensions.get('window').height/9,
        backgroundColor: themas.colors.secondary,
        alignItems: 'center',
        rowGap: 12,
        justifyContent: 'center',
        //paddingLeft: 310
    },
    boxBottom:{
        width: '100%',
        height: Dimensions.get('window').height/7,
        backgroundColor: 'white', 
    },
    scroll:{
        width: '100%',
        height: '100%',
        marginLeft: 20,
        flexDirection: 'column',
        columnGap: 100
    },
    formata:{
        flexDirection: 'column',
        rowGap: 10,
        marginTop: 80
    },
    plus:{
        width: 60,
        height: 60,
        marginLeft: 320
    }
})