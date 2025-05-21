import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
   
    boxButton2:{
        flexDirection: 'column',
        rowGap: 20,
        paddingLeft: 30,
        paddingRight: 30

    },
    google:{
            width: '100%',
            borderWidth: 1.5,
            backgroundColor: themas.colors.primary,
            borderRadius: 14,
            padding: 10,
            paddingRight: 45,
            paddingLeft: 55,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
    },
    logo:{
        width: 18,
        height: 18,
    },
    criar:{
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        paddingLeft: 10
    },
    logo2:{
        width: 22,
        height: 22,
    }

})