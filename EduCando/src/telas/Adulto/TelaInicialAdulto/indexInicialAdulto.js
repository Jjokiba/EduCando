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
                        //width={'40%'}
                        />
                </View>
                <View >
                    <BotaoGeral 
                        cor={cores.roxoClaro}
                        valor={'Parabenizar'}
                        //width={'80%'}
                        />
                </View>

                <View style={styleInicialAdulto.botoesInline}>
                    <BotaoGeral 
                        cor={cores.roxoClaro}
                        valor={'Ver tarefas criadas'}
                        width={'40%'}
                        />
                    <BotaoGeral 
                        cor={cores.roxoClaro}
                        valor={'Mandar mensagem'}
                        width={'40%'}
                        />
                </View>

            </View>
            

            

        </View>
    );
}