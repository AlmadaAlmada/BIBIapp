import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxTop:{
        width: '100%',
        height: Dimensions.get('window').height/7.2,
        backgroundColor: themas.colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    boxMid:{
        width: '100%',
        height: Dimensions.get('window').height/1.15,
        backgroundColor: themas.colors.secondary,
        alignItems: 'center',
        rowGap: 5,
    },
    boxBottom:{
        width: '100%',
        height: Dimensions.get('window').height/50,
        backgroundColor: themas.colors.secondary
    },
    boxButton:{
        flexDirection: 'row',
        columnGap: 30
    },
    button:{
        borderWidth: 1.5,
        backgroundColor: themas.colors.primary,
        borderRadius: 14,
        padding: 10,
        paddingRight: 45,
        paddingLeft: 45
    },
    button2:{
        borderWidth: 1.5,
        borderColor: themas.colors.primary,
        backgroundColor: 'white',
        borderRadius: 14,
        padding: 10,
        paddingRight: 38,
        paddingLeft: 38
    },
    criar:{
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        paddingLeft: 10
    },
    criar2:{
        fontWeight: 'bold',
        fontSize: 16,
        color: themas.colors.primary
    },
    
})