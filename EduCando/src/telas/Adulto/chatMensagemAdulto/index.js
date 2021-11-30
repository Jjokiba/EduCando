import React, { useState } from "react";
import { Alert, Image, Text, TextInput, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Botao from "../../../components/Botao/indexBotao";
import { cores, estiloGeral } from "../../../stylesCores";
import styles from "./style";
import Axios from  'axios';
import AppLoading from "expo-app-loading";
import ItemMensagem from "../../../components/listItemMensagem";
import { faIcons, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import ItemMensagemAdulto from "../../../components/listItemMensagemAdulto";

export default function chatMensagemAdulto({ navigation, route }){
    

    const [IsReady, SetIsReady] = useState(false);

    const [mensagemEscrita, setMensagemEscrita] = useState(null);

    async function sendMessage() {
        //var idResponsavel = await Axios.post('http://192.168.1.195:3001/getResponsavelID', {FK_CodCrianca : route.params.user.CodCrianca});
        //console.log("idzito: " + idResponsavel.data[0].CodResponsavel + "\nMensag:" + mensagemEscrita + "\ncod crianca:" + route.params.user.CodCrianca)
        await Axios.post("http://192.168.1.195:3001/sendMensagem",{ mensagem : mensagemEscrita, remetente : "Responsavel" , FK_CodCrianca : route.params.user.FK_CodCrianca, FK_CodResponsavel : route.params.user.codResponsavel});
        SetIsReady(false);
    }


    const handleChangeValues = (value) => { 
        setMensagemEscrita((prevValue) => (
            value
        ));
    };

    const [listaMensagens, setListaMensagens] = useState(null);
    //this.state ={ refresh : false }

    async function handleClickButton() {
        //setListaMensagens(null);
        setListaMensagens(await Axios.post("http://192.168.1.195:3001/getMensagens",{ FK_CodCrianca : route.params.user.CodCrianca}));
    }

  if (!IsReady) {
    return <AppLoading startAsync={handleClickButton()} 
             onFinish={() => {SetIsReady(true);}}
              onError={() => {}}/>;
  }
  else{
      //console.log(JSON.stringify(listaTarefasConcluidas));
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
                                    style={{width:100,height:100, alignSelf:'center'}}/>
            </View>

            <View style={styles.conteudoCard} >
                <View>
                    {
                        !listaMensagens ? 
                            console.log("Loading Chat...")
                        :
                        <FlatList
                            inverted
                            style={{width: 300}}
                            data={listaMensagens.data}
                            //renderItem={({item}) => renderItem}   
                            keyextractor={(x, i) => i}
                            //refresh={refresh}
                            renderItem={({ item }) => 
                            <ItemMensagemAdulto
                                codMensagem={item.codMensagem}
                                mensagem={item.mensagem} 
                                data_Mensagem={item.data_Mensagem}
                                remetente={item.remetente}
                                FK_CodCrianca={item.FK_CodCrianca}
                                FK_CodResponsavel={item.FK_CodResponsavel}
                                nome_Crianca={item.nome_Crianca}
                                nome_Res={item.nome_Res}
                                visto={item.visto}
                                funcaoReload={() => navigation.navigate('Chat')}
                            />
                            }
                            
                        />
                    }
                    
                </View>
            </View>

            <View style={{flex:1, alignSelf:'center', flexDirection:'row'}}>
                <TextInput 
                        placeholder='Digite uma mensagem'
                        onChangeText={e => handleChangeValues(e)}
                        multiline
                        numberOfLines={2}
                        style={{padding: 5, textAlignVertical: 'top', borderRadius:10, backgroundColor:'white', height:50, width:'80%'}}
                         ></TextInput>
                <TouchableOpacity onPress={()=> sendMessage()}><View style={{backgroundColor:cores.roxoClaro, padding:5, borderRadius:10}}><FontAwesomeIcon icon={faPaperPlane} size={ 40 }/></View></TouchableOpacity>
            </View>
        </View>
    );
  }
    
}