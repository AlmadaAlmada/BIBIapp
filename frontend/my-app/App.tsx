import './gesture-handler';
import { StyleSheet, Text, View } from 'react-native';


import Routes from './src/routes/index.routes';
import {NavigationContainer} from '@react-navigation/native'
import Alerta from './src/pages/Alerta';
import { UserProvider } from './src/pages/UserContext';
import { AlertaProvider } from './src/pages/AlertaContext';


export default function App() {
  return (
    <NavigationContainer>
      <AlertaProvider>
      <UserProvider>
      <Routes></Routes>
      </UserProvider>
      </AlertaProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
