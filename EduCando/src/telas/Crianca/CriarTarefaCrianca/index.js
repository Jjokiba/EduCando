import React from "react";
import { Alert, Image, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Botao from "../../../components/Botao/indexBotao";
import { cores, estiloGeral } from "../../../stylesCores";
import styles from "./style";
import {mask } from 'remask';
import Axios from  'axios';
import { useState } from "react/cjs/react.development";


export default function CriarTarefaCrianca({ navigation, route }){
    //route.params.user
    const [values, SetValues] = useState(({
        titulo_Tarefa: null,
        descricao_Tarefa: null,
        //data_tarefa: null,
        dataFinal_tarefa: null,
        FK_CodCrianca: route.params.user.CodCrianca,
        FK_CodResponsavel: route.params.user.FK_CodResponsavel
    }));

    function validaCampos(){
        var msg = 'Alguns pontos estão faltando:' ;
        var validacao = true;

        if(values.titulo_Tarefa == null){
            msg += "\nTitulo da tarefa não foi informado.\n";
            validacao = false;
        }

        if(values.descricao_Tarefa == null){
            msg += "\nDescrição da tarefa não foi informada.\n";
            validacao = false;
        }

        
        /*
        if(values.data_tarefa == null){
            msg += "\nData da tarefa não foi informada.\n";
            validacao = false;
        }*/

        if(values.dataFinal_tarefa == null){
            msg += "\nData final da tarefa não foi informada.\n";
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

    const [maskedDataFinal, setDataFinal] = useState(""); 
    const maskDateFinalChangeValue = (value, name) =>{
        const maskedValue = mask(value, ['99-99-9999 99:99']);
        SetValues((prevValue) => ({
            ...prevValue,
            [name]: maskedValue,
        }));
        setDataFinal(maskedValue);
    }
    //#endregion
    
    const handleClickButton = async () => {
        var teste = await validaCampos(); 
        //console.log(teste);
        if(teste){
            Axios.post('http://192.168.1.195:3001/registrarTarefa', {
                titulo_Tarefa: values.titulo_Tarefa,
                descricao_Tarefa: values.descricao_Tarefa,
                dataFinal_tarefa: values.dataFinal_tarefa,
                FK_CodCrianca: values.FK_CodCrianca,
                FK_CodResponsavel: values.FK_CodResponsavel
            }).then((response) =>{
                if(response.data != ""){
                    Alert.alert('Sucesso', 'Tarefa criada com sucesso!',[
                        {
                          text: "Voltar Para o inicio",
                          onPress: () => navigation.goBack(),
                          style: "confirm",
                        },
                      ]);
                }
                else
                {
                    Alert.alert('Erro', 'Falha ao tentar criar a tarefa.',[
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
                        Titulo da tarefa: 
                    </Text>
                    <View style={styles.caixaTexto}>
                        <TextInput 
                                placeholder='Titulo da tarefa'
                                onChangeText={e => handleChangeValues(e, 'titulo_Tarefa')}
                            ></TextInput>
                    </View>
                </View>
                <View>
                    <Text >
                        Descriçao da tarefa: 
                    </Text>
                    <View style={styles.caixaTexto}>
                        <TextInput 
                                placeholder='Descrição da tarefa'
                                onChangeText={e => handleChangeValues(e, 'descricao_Tarefa')}
                                multiline
                                numberOfLines={3}
                                style={{padding: 5, textAlignVertical: 'top'}}
                            ></TextInput>
                    </View>
                </View>
                <View>
                    <Text>
                        Data Final: 
                    </Text>
                    <View style={styles.caixaTexto}>                        
                        <TextInput 
                                placeholder='Data Final da Tarefa'
                                onChangeText={e => maskDateFinalChangeValue(e, 'dataFinal_tarefa')}
                                value={maskedDataFinal}
                                secureTextEntry={false}
                                keyboardType="numeric"
                            ></TextInput>
                    </View>
                </View>
            </View>

            <View style={{alignSelf:'center'}}>
                <Botao
                    cor={cores.verde}
                    valor={'Criar Tarefa'}
                    acao={() => handleClickButton()}
                />        
            </View>
        </View>
    );
}