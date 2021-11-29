import React, { useEffect } from "react";
import { Alert, Image, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Botao from "../../../components/Botao/indexBotao";
import { cores, estiloGeral } from "../../../stylesCores";
import styles from "./style";
import {mask } from 'remask';
import Axios from  'axios';
import { useState } from "react/cjs/react.development";


export default function CriarPedido({ navigation, route }){
    //route.params.user
    const [values, SetValues] = useState(({
        pedido: null,
        entusiasmo: null,
        //data_tarefa: null,
        codCrianca: route.params.user.CodCrianca
    }));

    const [pedido, setPedido] = useState(null);

    function validaCampos(){
        var msg = 'Alguns pontos estão faltando:' ;
        var validacao = true;

        if(values.pedido == null){
            msg += "\nO Pedido não foi informado.\n";
            validacao = false;
        }

        
        if(validacao == false){
            Alert.alert("Atenção", msg);
        }
        
        return validacao;
    }

    async function getPedido() {
        //console.log(route.params.user.CodCrianca);
        setPedido(await Axios.post("http://192.168.1.195:3001/selectCrianca",{ codCrianca : route.params.user.CodCrianca}));
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
            Axios.post('http://192.168.1.195:3001/inserirPedido', {
                pedido: values.pedido,
                codCrianca: values.codCrianca,
                //FK_CodResponsavel: values.FK_CodResponsavel,
                entusiasmo : parseInt(values.entusiasmo)
            }).then((response) =>{
                if(response.data != ""){
                    Alert.alert('Sucesso', 'Pedido Criado com sucesso!',[
                        {
                          text: "Voltar Para o inicio",
                          onPress: () => navigation.goBack(),
                          style: "confirm",
                        },
                      ]);
                }
                else
                {
                    Alert.alert('Erro', 'Falha ao tentar criar o pedido.',[
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

    useEffect(async () => {
        await getPedido();
    }, [])

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
                <Image source={require('../../../assets/images/corujinha.png')}
                                    style={{width:150,height:150, alignSelf:'center'}}/>
            </View>

            <View style={styles.conteudoCard} >
                <View>
                    <Text >
                        Pedido: 
                    </Text>
                    <View style={styles.caixaTexto}>
                        <TextInput 
                                placeholder='Mensagem do pedido'
                                onChangeText={e => handleChangeValues(e, 'pedido')}
                                multiline
                                numberOfLines={2}
                                style={{padding: 5, textAlignVertical: 'top'}}
                            ></TextInput>
                    </View>
                </View>
                <View>
                    <Text style={{textAlign:'center'}}>
                        Dê um numero do quanto você está contente com o App: 
                    </Text>
                    <View style={{backgroundColor:'white', width: 50, justfyContent:'center', marginLeft:130}}>
                        <TextInput 
                                style={{textAlign:'center', width:50}}
                                onChangeText={e => handleChangeValues(e, 'entusiasmo')}

                            ></TextInput>
                    </View>
                </View>

                <View>
                    <Text>Pedido Atual:</Text>
                    {pedido == null ? <Text>Não definido</Text> : <Text>{pedido.data[0].pedido}</Text>}
                </View>
            </View>
            <View style={{alignSelf:'center'}}>
                <Botao
                    cor={cores.verde}
                    valor={'Criar Pedido'}
                    acao={() => handleClickButton()}
                />        
            </View>
        </View>
    );
}