import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Inicial from '../pages/Inicial';
import { Alert } from 'react-native';
import Alerta from '../pages/Alerta';
import { createStackNavigator } from "@react-navigation/stack";
import Forum1 from '../pages/Forum1';
import Perfil from '../pages/Perfil';
import { themas } from '../global/themes';
import Lowbar from '../components/Lowbar';
import CadastroCarro from '../pages/CadastroCarro';
import Configura from '../pages/Configura';


const Tab = createBottomTabNavigator()

export default function BottomRoutes() {
    return(
        <Tab.Navigator
                screenOptions={{headerShown:false,
                }}
            tabBar={pros=> <Lowbar {...pros}/>}
        >
            <Tab.Screen name='Inicial' component={Inicial}></Tab.Screen>
            <Tab.Screen name='Alerta' component={Alerta}></Tab.Screen>
            <Tab.Screen name='Forum1' component={Forum1}></Tab.Screen>
            <Tab.Screen name='Configura' component={Configura}></Tab.Screen>
            <Tab.Screen name='Perfil' component={Perfil}></Tab.Screen>
            
        </Tab.Navigator>
    );
}