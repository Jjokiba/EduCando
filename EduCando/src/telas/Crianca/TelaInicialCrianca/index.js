import React, { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import BotaoGeral from "../../../components/BotaoGeral/indexBotaoGeral";
import Botao from "../../../components/Botao/indexBotao";
import { cores, estiloGeral } from "../../../stylesCores";
import styles from "../../TelaInicial/styles";
import styleTelaResponsiva from "../../../components/TelaResponsiva/styleTelaResponsiva";
import style from "./style";
import Axios from "axios";

export default function TelaInicialCrianca({ navigation, route }){
    const [notificacoes, setNotificacoes] =  useState(
    {data : [{
        tarefas : 0,
        ordens: 0,
        parabens: 0,
        mensagemCrianca: 0
    }]})
    
    
    navigation.addListener('focus', async () => {
        setNotificacoes(await Axios.post("http://192.168.1.195:3001/getPendenciasCrianca",{ FK_CodCrianca : route.params.user.CodCrianca}));
    });
  
    return (
        <View style={estiloGeral.fundo}>
            
            <View style={style.conteudoCabeçalho}>
                <View>
                    <Botao
                        cor={cores.vermelhoClaro}
                        valor={'< Sair'}
                        acao={ () => route.params.setUser(null) }
                    />
                </View>
                
            </View>
            <View>
                <TouchableOpacity onPress={()=> Alert.alert("Informativo","ID Da crianca:" + route.params.user.CodCrianca )}>
                    <Image source={require('../../../assets/images/corujinha.png')}
                                        style={{width:150,height:150, alignSelf:'center'}}/>
                </TouchableOpacity>
            </View>

            <View style={style.conteudoCard} >
                <View>
                    <BotaoGeral 
                        cor={cores.roxoClaro}
                        valor={'Criar tarefa'}
                        //width={'80%'}
                        //disabled={true}
                        acao={() => navigation.navigate('Criar Tarefa', {navigation})}
                        />
                </View>
                
                <View style={style.botoesInline}>
                    <BotaoGeral 
                        cor={cores.roxoClaro}
                        valor={'Desejo'}
                        //disabled={true}
                        //width={'40%'}
                        acao={ () => navigation.navigate('Pedido', {navigation})}
                        />
                    <BotaoGeral 
                        cor={cores.roxoClaro}
                        valor={'Diversão'}
                        acao={ () => navigation.navigate('Diversao', {navigation})}
                        //width={'40%'}
                        //disabled={true}
                        />
                </View>
                <View style={style.botoesInline}>
                    <BotaoGeral 
                        cor={cores.roxoClaro}
                        valor={'Tarefas'}
                        //disabled={true}
                        acao={ () => navigation.navigate('Tarefas', {navigation})}
                        />
                        {notificacoes ?  notificacoes.data[0].tarefas == 0 ? <View/>: <View style={style.bolinhaNotificação}><Text style={{textAlign: 'center'}}>{notificacoes.data[0].tarefas}</Text></View>:<View/> }
                    <BotaoGeral 
                        cor={cores.roxoClaro}
                        valor={'Ordens'}
                        //width={'40%'}
                        acao={ () => navigation.navigate('Historico de Ordem', {navigation})}
                        />
                        {notificacoes ?  notificacoes.data[0].ordens == 0 ? <View/>: <View style={style.bolinhaNotificação}><Text style={{textAlign: 'center'}}>{notificacoes.data[0].ordens}</Text></View>:<View/> }
                </View>
                <View style={style.botoesInline}>
                    <BotaoGeral 
                        cor={cores.roxoClaro}
                        valor={'Parabens'}
                        width={'40%'}
                        //style={{zindex:1}}
                        //disabled={true}
                        acao={() => navigation.navigate('Historico de Parabens', {navigation})}
                        />
                        {notificacoes ?  notificacoes.data[0].parabens == 0 ? <View/>: <View style={style.bolinhaNotificação}><Text style={{textAlign: 'center'}}>{notificacoes.data[0].parabens}</Text></View>:<View/> }
                    <BotaoGeral 
                        cor={cores.roxoClaro}
                        valor={'Mandar mensagem'}
                        width={'40%'}
                        //disabled={true}
                        acao={() => navigation.navigate('Chat', {navigation})}
                        />
                        {notificacoes ?  notificacoes.data[0].mensagemCrianca == 0 ? <View/>: <View style={style.bolinhaNotificação}><Text style={{textAlign: 'center'}}>{notificacoes.data[0].mensagemCrianca}</Text></View>:<View/> }
                </View>

            </View>
            

            

        </View>
    );
}