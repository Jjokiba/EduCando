import React from "react";
import { Alert, Image, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Botao from "../../../components/Botao/indexBotao";
import { cores, estiloGeral } from "../../../stylesCores";
import styles from "./style";
import Axios from  'axios';

const Item = ({ titulo_Tarefa, desc_Tarefa }) => (
    <View >
      <Text style={styles.fundo}>{titulo_Tarefa}</Text>
      <Text style={styles.fundo}>{desc_Tarefa}</Text>
      <Text style={styles.fundo}>{desc_Tarefa}</Text>
    </View>
  );

  


export default function listaTarefas({ navigation, route }){
    
    //const listaTarefasConcluidas = async () => { return await Axios.post("http://192.168.1.195:3001/getTarefas",{ FK_CodCrianca : route.params.user.FK_CodCrianca})};
    const listaTarefasConcluidas = Axios.post("http://192.168.1.195:3001/getTarefasCrianca",{ FK_CodCrianca : route.params.user.FK_CodCrianca});

    function handleClickButton() {
        console.log(JSON.stringify(listaTarefasConcluidas._W.data));//????????????
        console.log(JSON.stringify(listaTarefasConcluidas.data));//????????????
        console.log('pepino crianca: ' + route.params.user.FK_CodCrianca );
    }

    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );

    return (
        <View style={estiloGeral.fundo}>
            <View style={styles.conteudoCabeçalho}>
                <View>
                    <Botao
                        cor={cores.vermelhoClaro}
                        valor={'< Voltar'}
                        acao={ () => navigation.goBack()}
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
                    <FlatList
                        data={listaTarefasConcluidas.data}
                        renderItem={renderItem}
                        keyExtractor={item => listaTarefasConcluidas.data.codTarefa}
                    />
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