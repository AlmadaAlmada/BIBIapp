import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themas.colors.secondary,
    },
    boxTop: {
        height: Dimensions.get('window').height * 0.12,
        width: '100%',
        backgroundColor: themas.colors.primary,
        justifyContent: 'flex-end',
        paddingBottom: 15,
    },
    boxMid: {
        flex: 1,
        width: '100%',
        backgroundColor: themas.colors.secondary,
        justifyContent: 'space-evenly', //pra ficar mais parecido com a iamgem
        paddingTop: 20,
        alignItems: 'center',
        padding: 20,
    },
    settingsBlock: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: '100%',
        elevation: 5,
    },
    bottomText: {
        fontSize: 14,
        color: 'grey',
        marginBottom: 5,
    },
    bottomTextContainer: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 20,
        marginBottom: 70,
    },
    abaixa: {
        width: '100%',
        paddingHorizontal: 20,
    },
    btn: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    }
})