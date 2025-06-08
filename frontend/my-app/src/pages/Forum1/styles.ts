import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";
import { PostCard } from "../../components/PostCard";

export const style = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: themas.colors.secondary,
    },
    boxTop:{
        flex: 0.2,
        width: '100%',
        height: '10%',
        backgroundColor: themas.colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',  
    },
    boxMid:{
        flex: 1,
        width: '95%',
        backgroundColor: themas.colors.secondary,
        rowGap: 5,        
    },
    boxBottom:{
        width: '100%',
        height: '10%',
        backgroundColor: themas.colors.secondary,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 20,
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
     plus:{
        width: 60,
        height: 60,
        //marginLeft: 340,
    }
})