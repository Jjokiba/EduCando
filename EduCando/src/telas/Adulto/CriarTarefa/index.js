import React from "react";
import { Image, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Botao from "../../../components/Botao/indexBotao";
import { cores, estiloGeral } from "../../../stylesCores";
import styles from "./style";
import {mask } from 'remask';
import { useState } from "react/cjs/react.development";


export default function CriarTarefa({ navigation, route }){
    //route.params.user
    const [values, SetValues] = useState(({
        titulo_Tarefa: null,
        descricao_Tarefa: null,
        data_Tarefa: null,
        dataFinal_tarefa: null,
        FK_CodCrianca: null,
        FK_CodResponsavel: null
    }));

    const handleChangeValues = (value, name) => { 
        SetValues((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    const [maskedData, setData] = useState("");
    const maskDateChangeValue = (value, name) =>{
        const maskedValue = mask(value, ['99-99-9999 99:99']);
        SetValues((prevValue) => ({
            ...prevValue,
            [name]: maskedValue,
        }));
        setData(maskedValue);
    }

    const [maskedDataFinal, setDataFinal] = useState(""); //That´s kinda dumb and I know, But Im in a hurry
    const maskDateFinalChangeValue = (value, name) =>{
        const maskedValue = mask(value, ['99-99-9999 99:99']);
        SetValues((prevValue) => ({
            ...prevValue,
            [name]: maskedValue,
        }));
        setDataFinal(maskedValue);
    }

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
                                placeholder='Titulo da tarefa da criança'
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
                                placeholder='Descrição da tarefa da criança'
                                onChangeText={e => handleChangeValues(e, 'titulo_Tarefa')}
                                multiline
                                numberOfLines={3}
                                style={{padding: 5, textAlignVertical: 'top'}}
                            ></TextInput>
                    </View>
                </View>
                <View>
                    <Text >
                        Data Inicial da tarefa: 
                    </Text>
                    <View style={styles.caixaTexto}>
                        <TextInput 
                                placeholder='Data Final da Tarefa'
                                onChangeText={e => maskDateChangeValue(e, 'data_Tarefa')}
                                value={maskedData}
                                secureTextEntry={false}
                                keyboardType="numeric"
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
                                onChangeText={e => maskDateFinalChangeValue(e, 'dataFinal_Tarefa')}
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