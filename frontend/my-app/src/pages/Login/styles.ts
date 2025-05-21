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
        height: Dimensions.get('window').height/3,
        backgroundColor: '',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -20
    },
    boxMid:{
        width: '100%',
        height: Dimensions.get('window').height/3,
        backgroundColor: '',
        alignItems: 'center',
        rowGap: 30
    },
    boxBottom:{
        width: '100%',
        height: Dimensions.get('window').height/3,
        backgroundColor: ''
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
    }
})