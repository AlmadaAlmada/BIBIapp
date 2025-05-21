import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
   
    lowbar:{
        backgroundColor: themas.colors.primary,
        width: '100%',
        height: '8%',
        flexDirection: 'row',
        columnGap: 32,
        padding: 4,
    },
    icons:{
        width: 55,
        height: 55,
    }

})