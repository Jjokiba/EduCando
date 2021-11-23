import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Botao from "../../../components/Botao/indexBotao";
import { cores, estiloGeral } from "../../../stylesCores";
import styles from "./style";
import Axios from  'axios';
import AppLoading from "expo-app-loading";
import ItemTarefa from "../../../components/listItem";

export default function listaTarefas({ navigation, route }){
    

    const [IsReady, SetIsReady] = useState(false);

    const [listaTarefasConcluidas, setListaTarefas] = useState(null);

    async function handleClickButton() {
        setListaTarefas(await Axios.post("http://192.168.1.195:3001/getTarefasCrianca",{ FK_CodCrianca : route.params.user.FK_CodCrianca}));
        //console.log(JSON.stringify(listaTarefasConcluidas._W.data));//????????????
        //console.log(JSON.stringify(listaTarefasConcluidas.data));//????????????
        //console.log('pepino crianca: ' + route.params.user.FK_CodCrianca );
    }

  if (!IsReady) {
    return <AppLoading startAsync={handleClickButton()} 
             onFinish={() => {SetIsReady(true);}}
              onError={() => {}}/>;
  }
  else{
      console.log(JSON.stringify(listaTarefasConcluidas));
    return (
        <View style={estiloGeral.fundo}>
            <View style={styles.conteudoCabeçalho}>
                <View>
                    <Botao
                        cor={cores.vermelhoClaro}
                        valor={'< Voltar'}
                        acao={() => navigation.goBack()}
                    />
                </View>    
            </View>            
            <View>
                <Image source={require('../../../assets/images/corujao.png')}
                                    style={{width:150,height:150, alignSelf:'center'}}/>
            </View>

            <View style={styles.conteudoCard} >
                <View>
                    <Text>Lista de Tarefas</Text>
                    {
                        !listaTarefasConcluidas ? 
                            console.log(JSON.stringify(listaTarefasConcluidas) + " linha 73")
                        :
                        <FlatList
                            style={{width: 300}}
                            data={listaTarefasConcluidas.data}
                            //renderItem={({item}) => renderItem}   
                            keyextractor={(x, i) => i}
                            renderItem={({ item }) => 
                            <ItemTarefa 
                            codTarefa={item.codTarefa}
                            titulo_Tarefa={item.titulo_Tarefa} 
                            desc_Tarefa={item.descricao_Tarefa}
                            data_tarefa={item.data_tarefa}
                            data_FinalTarefa={item.data_FinalTarefa}
                            />
                            }
                            
                        />
                    }
                    
                </View>
            </View>

            <View style={{alignSelf:'center'}}>
                <Botao
                        cor={cores.verde}
                        valor={'Dar dinheiro ao neymar'}
                        acao={() => handleClickButton()}
                    />        
            </View>
        </View>
    );
  }
    
}