import React from "react";
import { Image, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import BotaoGeral from "../../../components/BotaoGeral/indexBotaoGeral";
import Botao from "../../../components/Botao/indexBotao";
import { cores, estiloGeral } from "../../../stylesCores";
import styles from "../../TelaInicial/styles";
import styleTelaResponsiva from "../../../components/TelaResponsiva/styleTelaResponsiva";
import style from "./style";

export default function TelaInicialCrianca({ navigation, route }){
    
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
                <Image source={require('../../../assets/images/corujinha.png')}
                                    style={{width:150,height:150, alignSelf:'center'}}/>
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
                    <BotaoGeral 
                        cor={cores.roxoClaro}
                        valor={'Ordens'}
                        //width={'40%'}
                        acao={ () => navigation.navigate('Historico de Ordem', {navigation})}
                        />
                </View>
                <View style={style.botoesInline}>
                    <BotaoGeral 
                        cor={cores.roxoClaro}
                        valor={'Parabens'}
                        width={'40%'}
                        //disabled={true}
                        acao={() => navigation.navigate('Historico de Parabens', {navigation})}
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