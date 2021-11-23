import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { cores } from '../../stylesCores';
import stylees from '../../telas/TelaInicial/styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';

function ItemTarefa({codTarefa ,titulo_Tarefa, desc_Tarefa, data_tarefa, dataFinal_Tarefa }) {
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
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={ faCheckCircle } size={ 32 } style={styleTarefa.iconzinho}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={ faTimesCircle } size={ 32 } style={styleTarefa.iconzinho}/>
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
