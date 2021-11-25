import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { cores } from '../../stylesCores';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios';
import Moment from 'moment';


async function vizualizarParabens(codParabens, funcaoReload){
  await Axios.post("http://192.168.1.195:3001/vizualizarParabens",{ codTarefa : codTarefa, concluido : concluido});
  funcaoReload();
}

function ItemParabens({cod ,titulo, desc, data_parabens, vizualizado, crianca, funcaoReload }) {
    return (
            <View style={styleTarefa.card}>
              {crianca ? vizualizarParabens(codParabens, funcaoReload) : null}
              <Text style={{display:'none'}}>{cod}</Text>
              <Text>Parabens! </Text>
                <Text> {titulo}</Text>
              <Text>Mensagem: </Text>
                <Text> {desc}</Text>
                <View style={styleTarefa.inlineflex}>
                    <TouchableOpacity>
                        {vizualizado ? 
                        <View style={styleTarefa.inlineflex}><FontAwesomeIcon icon={ faCheckCircle } size={ 20 } style={styleTarefa.iconzinho}/><Text>{Moment(data_parabens).format('DD/MM/YYYY hh:mm')}</Text></View> : 
                        <View style={styleTarefa.inlineflex}><FontAwesomeIcon icon={ faClock } size={ 20 } style={styleTarefa.iconzinho}/><Text>{Moment(data_parabens).format('DD/MM/YYYY hh:mm')}</Text></View> }
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
        alignSelf: 'flex-end',
        alignItems: 'center'
    }
  });

export default ItemParabens
