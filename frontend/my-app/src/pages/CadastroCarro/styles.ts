import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%'
    },
    boxTop:{
        width: '100%',
        height: Dimensions.get('window').height/7.5,
        backgroundColor: themas.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    boxMid:{
        width: '100%',
        height: Dimensions.get('window').height/1.2,
        backgroundColor: themas.colors.secondary,
        alignItems: 'center',
        rowGap: 30,
    },
    boxBottom:{
        width: '100%',
        height: Dimensions.get('window').height/8,
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
        paddingLeft: 45,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
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
        alignSelf: 'center'
        
    },
    scroll:{
        flexDirection: 'column',
        rowGap: 10
    },
    done:{
        paddingLeft: 17,
        paddingRight: 17,
    },
    criar2:{
        fontWeight: 'bold',
        fontSize: 16,
        color: themas.colors.primary
    },
    apelido:{
        width: '100%',
        marginTop: 15,
        gap:15,
        flexDirection: 'column'
        
    },
    apelido2:{
        width: '100%',
        marginTop: 10,
        flexDirection: 'column'
        
    },
    subTitle:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#003049',
        alignSelf: 'flex-start'
        
    },
    acima:{
        marginLeft: 23
    }

})