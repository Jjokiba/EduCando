import React from "react";
import { Image, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import BotaoGeral from "../../../components/BotaoGeral/indexBotaoGeral";
import Botao from "../../../components/Botao/indexBotao";
import { cores, estiloGeral } from "../../../stylesCores";
import styles from "../../TelaInicial/styles";
import styleTelaResponsiva from "../../../components/TelaResponsiva/styleTelaResponsiva";
import style from "./style";

export default function VisaoGeral({ navigation, route }){
    
    return (
        <View style={estiloGeral.fundo}>
            <View style={style.conteudoCabeçalho}>
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
                                    style={{width:150,height:150, alignSelf:'center'}}/>
            </View>

            <View style={style.conteudo}>
                <View style={style.linhaTitulo}> 
                    <Text style={{fontWeight:'bold', fontSize: 20}}>Visão Geral da criança</Text>
                </View>
                <View style={{flex:1,  flexDirection:'row', alignItems:'baseline', justifyContent: 'space-between'}}>
                    <View style={style.caixaConteudo}>
                        <Text style={style.text}>Adaptação:</Text>
                        <Text style={style.text}>0</Text>
                        <Text style={style.text}>Entusiasmo:</Text>
                        <Text style={style.text}>0</Text>
                    </View>
                    <View style={{flexDirection:'column',height: '40%',width: '50%', alignItems:'center', alignSelf:'center',justifyContent: 'space-around'}}>
                        <Text style={{fontWeight:'bold'}}>Nome</Text>

                        <Image source={require('../../../assets/images/corujinha.png')}
                                    style={{width: 80,height:80, alignItems:'center', alignSelf:'center', marginTop:10}}/>
                    </View>
                </View>
                <View style={style.footerConteudo}>
                    <Text style={style.text}>
                        Pedido:
                    </Text>
                    <Text style={style.text}>
                        PEDIDO DA CRIANCA
                    </Text>
                    <Text style={style.text}>
                        Maior Diversão:
                    </Text>
                    <Text style={style.text}>
                        PIPIP POPOP DIVERSAO
                    </Text>
                </View>
            </View>
            

            

        </View>
    );
}