import React, { useEffect } from "react";
import { Alert, Image, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Botao from "../../../components/Botao/indexBotao";
import { cores, estiloGeral } from "../../../stylesCores";
import styles from "./style";
import {mask } from 'remask';
import Axios from  'axios';
import { useState } from "react/cjs/react.development";


export default function CriarDiversao({ navigation, route }){
    //route.params.user
    const [values, SetValues] = useState(({
        diversao: null,
        //data_tarefa: null,
        CodCrianca: route.params.user.CodCrianca
    }));

    const [crianca, setCrianca] = useState(null);

    function validaCampos(){
        var msg = 'Alguns pontos estão faltando:' ;
        var validacao = true;

        if(values.diversao == null){
            msg += "\nA diversão não foi informada.\n";
            validacao = false;
        }

        
        if(validacao == false){
            Alert.alert("Atenção", msg);
        }
        
        return validacao;
    }

    async function getCrianca() {
        //console.log(route.params.user.CodCrianca);
        setCrianca(await Axios.post("http://192.168.1.195:3001/selectCrianca",{ codCrianca : route.params.user.CodCrianca}));
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
            Axios.post('http://192.168.1.195:3001/inserirDiversao', {
                codCrianca: route.params.user.CodCrianca,
                diversao: values.diversao
                //FK_CodResponsavel: values.FK_CodResponsavel,
            }).then((response) =>{
                if(response.data != ""){
                    Alert.alert('Sucesso', 'Diversão registrada!',[
                        {
                          text: "Voltar Para o inicio",
                          onPress: () => navigation.goBack(),
                          style: "confirm",
                        },
                      ]);
                }
                else
                {
                    Alert.alert('Erro', 'Falha ao tentar criar o registro.',[
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
        await getCrianca();
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

            <View style={styles.conteudoCard}>
                <View>
                    <Text>
                        Informe o que mais te diverte: 
                    </Text>
                    <View style={styles.caixaTexto}>
                        <TextInput 
                                placeholder='Diversão'
                                onChangeText={e => handleChangeValues(e, 'diversao')}
                                multiline
                                numberOfLines={2}
                                style={{padding: 5, textAlignVertical: 'top'}}
                            ></TextInput>
                    </View>
                </View>

                <View>
                    <Text>Diversao Atual:</Text>
                    {crianca == null ? <Text>Não definido</Text> : <Text>{crianca.data[0].diversao != null ? crianca.data[0].diversao : "Não Definido"}</Text>}
                </View>
            </View>
            <View style={{alignSelf:'center'}}>
                <Botao
                    cor={cores.verde}
                    valor={'Alterar Diversão'}
                    acao={() => handleClickButton()}
                />
            </View>
        </View>
    );
}