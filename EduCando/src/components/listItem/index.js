import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { cores } from '../../stylesCores';
import stylees from '../../telas/TelaInicial/styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios';


async function completaTarefa(codTarefa, concluido, funcaoReload, ready){
  await Axios.post("http://192.168.1.195:3001/concluirTarefa",{ codTarefa : codTarefa, concluido : concluido});
  funcaoReload();
}

function ItemTarefa({codTarefa ,titulo_Tarefa, desc_Tarefa, data_tarefa, dataFinal_Tarefa, funcaoReload }) {
    return (
            <View style={styleTarefa.card}>
              <Text style={{display:'none'}}>{codTarefa}</Text>
              <Text>Tarefa: </Text>
                <Text> {titulo_Tarefa}</Text>
              <Text>Descrição: </Text>
                <Text> {desc_Tarefa}</Text>
              <Text>Data da Tarefa: </Text>
                <Text>{data_tarefa == null ? 'Não Informado' : data_tarefa}</Text>
              <Text>Data Final para Tarefa: </Text>
                <Text>{dataFinal_Tarefa == null ? 'Não Informado' : data}</Text>
                <View style={styleTarefa.inlineflex}>
                    <TouchableOpacity onPress={() => completaTarefa(codTarefa, 1, funcaoReload, ready)}>
                        <FontAwesomeIcon icon={ faCheckCircle } size={ 32 } style={styleTarefa.iconzinho}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>completaTarefa(codTarefa, -1, funcaoReload)}>
                        <FontAwesomeIcon icon={ faTimesCircle } size={ 32 } style={styleTarefa.iconzinho} />
                    </TouchableOpacity>
                </View>
                
            </View>
    )
}

const styleTarefa = StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: cores.verde,
      borderRadius: 10,
      margin: 10,
      padding:10
    },
    iconzinho:{
      fontSize: 40,
      margin: 5
    },
    inlineflex:{
        display:'flex',
        flex:1,
        flexDirection: 'row',
        alignSelf: 'flex-end'
    }
  });

export default ItemTarefa
