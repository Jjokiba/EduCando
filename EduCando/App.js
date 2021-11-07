import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
/*import { TouchableOpacity } from 'react-native-gesture-handler';*/
import TelaInicial from './src/telas/TelaInicial/index.js';
/*import { useFonts,Calistoga_400Regular } from '@expo-google-fonts/calistoga'*/

import AppLoading from 'expo-app-loading';
//import PoetsenOne from './src/assets/fonts/PoetsenOne.ttf'
import * as Font from 'expo-font';
import TelaResponsiva from './src/components/TelaResponsiva/indexTelaResponsiva.js';
import RegistrarAdulto from './src/telas/Registro/RegistrarAdulto/index.js';
import RegistrarCriança from './src/telas/Registro/RegistrarCriança/index.js';
import LoginScreen from './src/telas/Login/index.js';
import TelaInicialAdulto from './src/telas/Adulto/TelaInicialAdulto/indexInicialAdulto.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { cores } from './src/stylesCores.js';
import CriarTarefa from './src/telas/Adulto/CriarTarefa/index.js';

export default function App() {
  
  const [IsReady, SetIsReady] = useState(false);
  const [user, setUser] = useState(null);
  const accountLogin = null;
  const Stack = createNativeStackNavigator();

  React.useEffect(() => {
    setTimeout((() => {
      //setUser({})
    }), 1000)
  }, [])

  const getFonts = async () => {
    await Font.loadAsync({
      'PoetsenOne' : require('./src/assets/fonts/PoetsenOne.ttf')
    });
    
  this.setState({ IsReady: true }); 
  };
  if (!IsReady) {
    return <AppLoading startAsync={getFonts} 
              onFinish={() => SetIsReady(true)}
              onError={() => {}}/>;
  }
  return (
    <TelaResponsiva>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={({ route, navigation}) => ({headerShown:false, headerStyle:{backgroundColor:cores.roxoFundo, boxShadow:'0'}})}>
          
        {user ? (
          user.tipoConta ?( // adulto
            <>
              <Stack.Screen name ='Tela Inicial Adulto' component={TelaInicialAdulto} initialParams={{ setUser: setUser }}/>
              <Stack.Screen name ='Criar Tarefa' component={CriarTarefa} initialParams={{ user: user, setUser: setUser }}/>
            </>
          ) : (
            <>
              <Stack.Screen name ='Tela Inicial Crianca' component={'To Do'} initialParams={{ setUser: setUser }}/>
            </>
          )
          
        ) : (
          <>
            <Stack.Screen name ='Home' component={TelaInicial} options={{}}/>
            <Stack.Screen name ='Registrar Adulto' component={RegistrarAdulto}/>
            <Stack.Screen name ='Registrar Criança' component={RegistrarCriança}/>
            <Stack.Screen name ='Login' component={LoginScreen} initialParams={{ setUser: setUser }}/>
          </>
        )
        }
        
        </Stack.Navigator>
      </NavigationContainer>
    </TelaResponsiva>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
