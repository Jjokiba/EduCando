import React from "react";
import { Image, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import BotaoGeral from "../../../components/BotaoGeral/indexBotaoGeral";
import Botao from "../../../components/Botao/indexBotao";
import { cores } from "../../../stylesCores";
import styles from "./styleInicialAdulto";
import styleTelaResponsiva from "../../../components/TelaResponsiva/styleTelaResponsiva";
import styleInicialAdulto from "./styleInicialAdulto";

export default function TelaInicialAdulto({ navigation }){

    return (
        <View>
            <View style={styles.conteudoCabeçalho}>
                <View>
                    <Botao
                        cor={cores.vermelhoClaro}
                        valor={'< Voltar'}
                        acao={ () => navigation.canGoBack() ? navigation.goBack() : 'a' }
                    />
                </View>
                
            </View>
            <View>
                <Image source={require('../../../assets/images/corujinha.png')}
                                    style={{width:150,height:150, alignSelf:'center'}}/>
            </View>

            <View style={styles.conteudoCard} >
                <View>
                    <BotaoGeral 
                        cor={cores.azulClaro}
                        valor={'Visão geral da criança'}
                        //width={'80%'}
                        />
                </View>
                
                <View style={styleInicialAdulto.botoesInline}>
                    <BotaoGeral 
                        cor={cores.azulClaro}
                        valor={'Criar tarefa'}
                        //width={'40%'}
                        />
                    <BotaoGeral 
                        cor={cores.azulClaro}
                        valor={'Criar ordem'}
                        //width={'40%'}
                        />
                </View>
                <View >
                    <BotaoGeral 
                        cor={cores.azulClaro}
                        valor={'Parabenizar'}
                        //width={'80%'}
                        />
                </View>

                <View style={styleInicialAdulto.botoesInline}>
                    <BotaoGeral 
                        cor={cores.azulClaro}
                        valor={'Ver tarefas criadas'}
                        width={'40%'}
                        />
                    <BotaoGeral 
                        cor={cores.azulClaro}
                        valor={'Mandar mensagem'}
                        width={'40%'}
                        />
                </View>

            </View>
            

            

        </View>
    );
}