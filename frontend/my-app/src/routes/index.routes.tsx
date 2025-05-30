import React from "react";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/Login";
import BottomRoutes from "./bottom.routes";
import CadastroCarro from "../pages/CadastroCarro";
import TestModal from "../pages/TestModal";
import TestModal2 from "../pages/TestModal2";
import Cadastro from "../pages/Cadastro";
import PostModal from "../pages/PostModal";



export default function Routes(){

    const Stack = createStackNavigator()

    return(
        <Stack.Navigator
        screenOptions={{headerShown:false}}
        >

            <Stack.Screen
            name="Login"
            component={Login}>
            </Stack.Screen>

            <Stack.Screen
            name="BottomRoutes"
            component={BottomRoutes}>
            </Stack.Screen>

            <Stack.Screen name="CadastroCarro" component={CadastroCarro} />

            <Stack.Screen name="TestModal" component={TestModal} />

            <Stack.Screen name="TestModal2" component={TestModal2} />

            <Stack.Screen name="Cadastro" component={Cadastro} />

            <Stack.Screen name="PostModal" component={PostModal} />

        </Stack.Navigator>
    )
}