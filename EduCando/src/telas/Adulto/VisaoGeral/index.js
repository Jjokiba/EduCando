import React from "react";
import { Image, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import BotaoGeral from "../../../components/BotaoGeral/indexBotaoGeral";
import Botao from "../../../components/Botao/indexBotao";
import { cores, estiloGeral } from "../../../stylesCores";
import styles from "../../TelaInicial/styles";
import styleTelaResponsiva from "../../../components/TelaResponsiva/styleTelaResponsiva";
import style from "./style";
import { useState } from "react/cjs/react.development";
import Axios from "axios";

export default function VisaoGeral({ navigation, route }){
    const [crianca, setCrianca] = useState(null)

    navigation.addListener('focus', async () => {
        setCrianca(await Axios.post("http://192.168.1.195:3001/selectVisaoGeral",{ codCrianca : route.params.user.FK_CodCrianca}));
    });

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
            {crianca != null ? 
            <>
            <View style={style.conteudo}>
                <View style={style.linhaTitulo}> 
                    <Text style={{fontWeight:'bold', fontSize: 20}}>Visão Geral da criança</Text>
                </View>
                <View style={{flex:1,  flexDirection:'row', alignItems:'baseline', justifyContent: 'space-between'}}>
                    <View style={style.caixaConteudo}>
                        <Text style={style.text}>Adaptação:</Text>
                        <Text style={style.text}>{crianca.data[0].adaptacao}</Text>
                        <Text style={style.text}>Entusiasmo:</Text>
                        <Text style={style.text}>{crianca.data[0].entusiasmo}</Text>
                    </View>
                    <View style={{flexDirection:'column',height: '40%',width: '50%', alignItems:'center', alignSelf:'center',justifyContent: 'space-around'}}>
                        <Text style={{fontWeight:'bold'}}>{crianca.data[0].nome_Crianca}</Text>

                        <Image source={require('../../../assets/images/corujinha.png')}
                                    style={{width: 80,height:80, alignItems:'center', alignSelf:'center', marginTop:10}}/>
                    </View>
                </View>
                <View style={style.footerConteudo}>
                    <Text style={style.text}>
                        Pedido:
                    </Text>
                    <Text style={style.text}>
                        {crianca.data[0].pedido}
                    </Text>
                    <Text style={style.text}>
                        Maior Diversão:
                    </Text>
                    <Text style={style.text}>
                        {crianca.data[0].diversao}
                    </Text>
                </View>
            </View>
            </>    
            :
            <View><Text>Carregando....</Text></View>
        }
            
            

            

        </View>
    );
}