import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { cores } from '../../stylesCores';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios';
import Moment from 'moment';
import { useState } from 'react/cjs/react.development';


async function vizualizar(codMensagem, funcaoReload){
  await Axios.post("http://192.168.1.195:3001/vizualizarMensagem",{ codMensagem : codMensagem, visto : 1});
  funcaoReload();
}

function info(){
  //Alert.alert("Informativo", <FontAwesomeIcon icon={ faClock }/> + " Informa que a mensagem foi enviada\n" + <FontAwesomeIcon icon={ faCheckCircle }/> + "Informa que a mensagem foi vizualizada" )
}

function ItemMensagem({codMensagem, mensagem, data_Mensagem, visto, remetente, nome_Crianca, nome_Res, FK_CodCrianca, FK_CodResponsavel, funcaoReload }) {//parabens informa se é um item de ordem ou de parabens a ser visualizado
    const [crianca, setCrianca] = useState(true);
    useEffect(() => {
      if (remetente != 'Crianca') 
        {
          setCrianca(false);
        } 

      if(remetente != "Crianca" && !visto){
        vizualizar(codMensagem, funcaoReload);
      }
    }, [])

    return (
            <View style={[crianca ? styleMensagem.cardCrianca : styleMensagem.cardAdulto]} >
              
              <Text style={{display:'none'}}>{codMensagem}</Text>
              <Text>{crianca ? nome_Crianca : nome_Res}</Text>
                <Text> {mensagem}</Text>
                <View style={styleMensagem.inlineflex}>
                    <TouchableOpacity onPress={()=> info()}>
                        {visto ? 
                        <View style={styleMensagem.inlineflex}><FontAwesomeIcon icon={ faCheckCircle } size={ 20 } style={styleMensagem.iconzinho}/><Text>{Moment(data_Mensagem).format('DD/MM/YYYY HH:mm')}</Text></View> : 
                        <View style={styleMensagem.inlineflex}><FontAwesomeIcon icon={ faClock } size={ 20 } style={styleMensagem.iconzinho}/><Text>{Moment(data_Mensagem).format('DD/MM/YYYY HH:mm')}</Text></View> }
                    </TouchableOpacity>
                </View>
            </View>
    )
}

const styleMensagem = StyleSheet.create({
    cardCrianca: {
      flex: 1,
      backgroundColor: cores.verdeClaro,
      borderRadius: 10,
      marginTop: 10,
      marginLeft: 40,
      padding:10
    },
    cardAdulto: {
      flex: 1,
      backgroundColor: cores.verde,
      borderRadius: 10,
      marginTop: 10,
      marginRight: 40,
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

export default ItemMensagem;
