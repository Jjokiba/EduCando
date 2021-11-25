import React from "react";
import { Alert, Image, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Botao from "../../../components/Botao/indexBotao";
import { cores, estiloGeral } from "../../../stylesCores";
import styles from "./style";
import {mask } from 'remask';
import Axios from  'axios';
import { useState } from "react/cjs/react.development";


export default function CriarParabenizacao({ navigation, route }){
    //route.params.user
    const [values, SetValues] = useState(({
        titulo_Parabens: null,
        descricao_Parabens: null,
        //data_tarefa: null,
        FK_CodCrianca: route.params.user.FK_CodCrianca,
        FK_CodResponsavel: route.params.user.codResponsavel
    }));

    function validaCampos(){
        var msg = 'Alguns pontos estão faltando:' ;
        var validacao = true;

        if(values.titulo_Parabens == null){
            msg += "\nTitulo da Parabenização não foi informado.\n";
            validacao = false;
        }

        if(values.descricao_Parabens == null){
            msg += "\nDescrição da Parabenização não foi informado.\n";
            validacao = false;
        }

        
        if(validacao == false){
            Alert.alert("Atenção", msg);
        }
        
        return validacao;
    }

    

    //#region HandleChanges
    const handleChangeValues = (value, name) => { 
        SetValues((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
        //console.log('crianca: ' + values.FK_CodCrianca + "\nResponsavel: " + values.FK_CodResponsavel);
    };

    
    
    const handleClickButton = async () => {
        var teste = await validaCampos(); 
        //console.log(teste);
        if(teste){
            Axios.post('http://192.168.1.195:3001/registrarParabens', {
                titulo_Parabens: values.titulo_Parabens,
                descricao_Parabens: values.descricao_Parabens,
//                data_tarefa: values.data_Parabens,
                FK_CodCrianca: values.FK_CodCrianca,
                FK_CodResponsavel: values.FK_CodResponsavel
            }).then((response) =>{
                if(response.data != ""){
                    Alert.alert('Sucesso', 'Parabens Enviado com sucesso!',[
                        {
                          text: "Voltar Para o inicio",
                          onPress: () => navigation.goBack(),
                          style: "confirm",
                        },
                      ]);
                }
                else
                {
                    Alert.alert('Erro', 'Falha ao tentar criar a parabenização.',[
                        {
                          text: "Tentar novamente",
                          onPress: () => console.log(""),
                          style: "confirm",
                        },
                      ]);
                }
            });
        }
        
    };

    return (
        <View style={estiloGeral.fundo}>
            <View style={styles.conteudoCabeçalho}>
                <View>
                    <Botao
                        cor={cores.vermelhoClaro}
                        valor={'< Voltar'}
                        acao={ () => navigation.goBack()}
                    />
                </View>
                
            </View>            
            <View>
                <Image source={require('../../../assets/images/corujao.png')}
                                    style={{width:150,height:150, alignSelf:'center'}}/>
            </View>

            <View style={styles.conteudoCard} >
                <View>
                    <Text >
                        Titulo da Parabenizacao: 
                    </Text>
                    <View style={styles.caixaTexto}>
                        <TextInput 
                                placeholder='Titulo da parabenização'
                                onChangeText={e => handleChangeValues(e, 'titulo_Parabens')}
                            ></TextInput>
                    </View>
                </View>
                <View>
                    <Text >
                        Mensagem da parabenização: 
                    </Text>
                    <View style={styles.caixaTexto}>
                        <TextInput 
                                placeholder='Mensagem de parabens'
                                onChangeText={e => handleChangeValues(e, 'descricao_Parabens')}
                                multiline
                                numberOfLines={5}
                                style={{padding: 5, textAlignVertical: 'top'}}
                            ></TextInput>
                    </View>
                </View>
            </View>

            <View style={{alignSelf:'center'}}>
                <Botao
                    cor={cores.verde}
                    valor={'Enviar Parabenização!'}
                    acao={() => handleClickButton()}
                />        
            </View>
        </View>
    );
}