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
import listaTarefas from './src/telas/Adulto/ListaTarefas/index.js';
import CriarOrdem from './src/telas/Adulto/CriarOrdem/index.js';
import CriarParabenizacao from './src/telas/Adulto/CriarParabenizacao/index.js';
import listaParabens from './src/telas/Adulto/ListaParabens/index.js';
import listaOrdem from './src/telas/Adulto/ListaOrdem/index.js';
import VisaoGeral from './src/telas/Adulto/VisaoGeral/index.js';
import TelaInicialCrianca from './src/telas/Crianca/TelaInicialCrianca/index.js';
import listaOrdemCrianca from './src/telas/Crianca/ListarOrdens/index.js';
import listaParabensCrianca from './src/telas/Crianca/ListarParabens/index.js';
import CriarTarefaCrianca from './src/telas/Crianca/CriarTarefaCrianca/index.js';
import CriarPedido from './src/telas/Crianca/CriarPedido/index.js';
import listaTarefasCrianca from './src/telas/Crianca/ListarTarefasCrianca/index.js';
import CriarDiversao from './src/telas/Crianca/CriarDiversao/index.js';
import chatMensagemCrianca from './src/telas/Crianca/chatMensagemCrianca/index.js';
import chatMensagemAdulto from './src/telas/Adulto/chatMensagemAdulto/index.js';

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
              <Stack.Screen name ='Tela Inicial Adulto' component={TelaInicialAdulto} initialParams={{user: user, setUser: setUser }}/>
              <Stack.Screen name ='Visao geral' component={VisaoGeral} initialParams={{ user: user, setUser: setUser }}/>
              <Stack.Screen name ='Criar Tarefa' component={CriarTarefa} initialParams={{ user: user, setUser: setUser }}/>
              <Stack.Screen name ='Ver Tarefas' component={listaTarefas} initialParams={{ user: user, setUser: setUser }}/>
              <Stack.Screen name ='Criar Ordem' component={CriarOrdem} initialParams={{ user: user, setUser: setUser }}/>
              <Stack.Screen name ='Parabenizar' component={CriarParabenizacao} initialParams={{ user: user, setUser: setUser }}/>
              <Stack.Screen name ='Historico de parabenização' component={listaParabens} initialParams={{ user: user, setUser: setUser }}/>
              <Stack.Screen name ='Historico de Ordem' component={listaOrdem} initialParams={{ user: user, setUser: setUser }}/>
              <Stack.Screen name ='Chat' component={chatMensagemAdulto} initialParams={{ user: user, setUser: setUser }}/>
            </>
          ) : (//criança
            <>
              <Stack.Screen name ='Tela Inicial Crianca' component={TelaInicialCrianca} initialParams={{ user: user, setUser: setUser }}/>
              <Stack.Screen name ='Historico de Ordem' component={listaOrdemCrianca} initialParams={{ user: user, setUser: setUser }}/>
              <Stack.Screen name ='Historico de Parabens' component={listaParabensCrianca} initialParams={{ user: user, setUser: setUser }}/>
              <Stack.Screen name ='Tarefas' component={listaTarefasCrianca} initialParams={{ user: user, setUser: setUser }}/>
              <Stack.Screen name ='Criar Tarefa' component={CriarTarefaCrianca} initialParams={{ user: user, setUser: setUser }}/>
              <Stack.Screen name ='Pedido' component={CriarPedido} initialParams={{ user: user, setUser: setUser }}/>
              <Stack.Screen name ='Diversao' component={CriarDiversao} initialParams={{ user: user, setUser: setUser }}/>
              <Stack.Screen name ='Chat' component={chatMensagemCrianca} initialParams={{ user: user, setUser: setUser }}/>
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
