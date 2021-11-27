import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { cores } from '../../stylesCores';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios';
import Moment from 'moment';


async function vizualizar(parabens ,cod, funcaoReload){
  console.log("vai se fuder");
  if (parabens) {
    await Axios.post("http://192.168.1.195:3001/vizualizarParabens",{ codParabens : cod, concluido : concluido});  
  }
  else{
    console.log("vai se fuder")
    await Axios.post("http://192.168.1.195:3001/vizualizarOrdem",{ codOrdem : cod, visto : 1});
  }
  
  funcaoReload();
}

function info(){
  //Alert.alert("Informativo", <FontAwesomeIcon icon={ faClock }/> + " Informa que a mensagem foi enviada\n" + <FontAwesomeIcon icon={ faCheckCircle }/> + "Informa que a mensagem foi vizualizada" )
}

function ItemParabens({cod ,titulo, desc, data_parabens, vizualizado, crianca, parabens, funcaoReload }) {//parabens informa se é um item de ordem ou de parabens a ser visualizado
    useEffect(() => {
      // write your code here, it's like componentWillMount
      if (crianca && !vizualizado) 
      {
        vizualizar(parabens, cod, funcaoReload);
      } 
      //onScreenLoad();
    }, [])

    return (
            <View style={styleTarefa.card} startAsync={crianca ? () => vizualizar(parabens ,cod, funcaoReload) : null}>
              
              <Text style={{display:'none'}}>{cod}</Text>
              <Text >{titulo}</Text>
               <Text >Mensagem: </Text>
                <Text> {desc}</Text>
                <View style={styleTarefa.inlineflex}>
                    <TouchableOpacity onPress={()=> info()}>
                        {vizualizado ? 
                        <View style={styleTarefa.inlineflex}><FontAwesomeIcon icon={ faCheckCircle } size={ 20 } style={styleTarefa.iconzinho}/><Text>{Moment(data_parabens).format('DD/MM/YYYY HH:mm')}</Text></View> : 
                        <View style={styleTarefa.inlineflex}><FontAwesomeIcon icon={ faClock } size={ 20 } style={styleTarefa.iconzinho}/><Text>{Moment(data_parabens).format('DD/MM/YYYY HH:mm')}</Text></View> }
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
