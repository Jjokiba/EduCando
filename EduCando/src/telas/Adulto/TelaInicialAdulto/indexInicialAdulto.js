import React from "react";
import { Image, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import BotaoGeral from "../../../components/BotaoGeral/indexBotaoGeral";
import Botao from "../../../components/Botao/indexBotao";
import { cores, estiloGeral } from "../../../stylesCores";
import styles from "../../TelaInicial/styles";
import styleTelaResponsiva from "../../../components/TelaResponsiva/styleTelaResponsiva";
import styleInicialAdulto from "./styleInicialAdulto";

export default function TelaInicialAdulto({ navigation, route }){
    
    return (
        <View style={estiloGeral.fundo}>
            <View style={styleInicialAdulto.conteudoCabeçalho}>
                <View>
                    <Botao
                        cor={cores.vermelhoClaro}
                        valor={'< Sair'}
                        acao={ () => route.params.setUser(null) }
                    />
                </View>
                
            </View>
            <View>
                <Image source={require('../../../assets/images/corujao.png')}
                                    style={{width:150,height:150, alignSelf:'center'}}/>
            </View>

            <View style={styleInicialAdulto.conteudoCard} >
                <View>
                    <BotaoGeral 
                        cor={cores.roxoClaro}
                        valor={'Visão geral da criança'}
                        //width={'80%'}
                        //disabled={true}
                        acao={() => navigation.navigate('Visao geral', {navigation})}
                        />
                </View>
                
                <View style={styleInicialAdulto.botoesInline}>
                    <BotaoGeral 
                        cor={cores.roxoClaro}
                        valor={'Criar tarefa'}
                        //width={'40%'}
                        acao={ () => navigation.navigate('Criar Tarefa', {navigation})}
                        />
                    <BotaoGeral 
                        cor={cores.roxoClaro}
                        valor={'Criar ordem'}
                        acao={ () => navigation.navigate('Criar Ordem', {navigation})}
                        //width={'40%'}
                        //disabled={true}
                        />
                </View>
                <View style={styleInicialAdulto.botoesInline}>
                    <BotaoGeral 
                        cor={cores.roxoClaro}
                        valor={'Listar Tarefas'}
                        acao={ () => navigation.navigate('Ver Tarefas', {navigation})}
                        />
                    <BotaoGeral 
                        cor={cores.roxoClaro}
                        valor={'Listar Ordens'}
                        //width={'40%'}
                        acao={ () => navigation.navigate('Historico de Ordem', {navigation})}
                        />
                </View>
                <View >
                    <BotaoGeral 
                        cor={cores.roxoClaro}
                        valor={'Parabenizar'}
                        acao={ () => navigation.navigate('Parabenizar', {navigation})}
                        //width={'80%'}
                        //disabled={true}
                        />
                </View>

                <View style={styleInicialAdulto.botoesInline}>
                    <BotaoGeral 
                        cor={cores.roxoClaro}
                        valor={'Historico de Parabenizações'}
                        width={'40%'}
                        acao={ () => navigation.navigate('Historico de parabenização', {navigation})}
                        />
                    <BotaoGeral 
                        cor={cores.roxoClaro}
                        valor={'Mandar mensagem'}
                        width={'40%'}
                        disabled={true}
                        />
                </View>

            </View>
            

            

        </View>
    );
}