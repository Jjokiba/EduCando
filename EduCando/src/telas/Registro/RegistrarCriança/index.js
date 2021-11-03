
import React,  { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Botao from "../../../components/Botao/indexBotao";
import { cores, estiloGeral } from "../../../stylesCores";
import styles from "./styles";
import Axios from "axios";





export default function RegistrarCriança({ navigation }){
    const [values, SetValues] = useState(({
        nome_Crianca: null,
        dataNasc_Crianca: null,
        email_Crianca: null,
        senha_Crianca: null,
        senhaConfirma_Crianca: null
    }));
    const [showDatePicker, setShowDatePicker] = useState(false);


    const handleChangeValues = (value, name) => { 
        SetValues((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    async function validaCampos() {
        var msg = 'Alguns pontos estão faltando:' ;
        var validacao = true;

        if(values.nome_Crianca == null){
            msg += "\nCodigo da criança nao foi informado, favor realizar o cadastro da criança e retornar com o codigo\n";
            validacao = false;
        }

        if(values.dataNasc_Crianca == null){
            msg += "\nData de nascimento da criança não foi informada\n";
            validacao = false;
        }

        if(values.email_Crianca == null){
            msg += "\nEmail para cadastro da criança não foi informado\n";
            validacao = false;
        }

        if(values.senha_Crianca == null && values.senhaConfirma_Crianca == values.senha_Crianca){
            msg += "\nSenha para cadastro da criança apresenta algum problema\n";
            validacao = false;
        }

        if(validacao == false){
            Alert.alert("Atenção", msg);
        }
        
        return validacao;
    }

    const handleClickButton = async () => {
        var teste = await validaCampos(); 
        //console.log(teste);
        var numInserido = await Axios.get('http://192.168.1.195:3001/getLastInsertId', {});

        
        if(teste){
            var response = await Axios.post('http://192.168.1.195:3001/registrarCrianca', {
                nome_Crianca: values.nome_Crianca,
                dataNasc_Crianca: values.dataNasc_Crianca,
                email_Crianca: values.email_Crianca,
                senha_Crianca: values.senha_Crianca,  
            });
            if(response.data != "")
            {
                var numInserido = await Axios.get('http://192.168.1.195:3001/getLastInsertId', {});
                Alert.alert('Sucesso', 'Criança cadastrada com sucesso\nAnote o Codigo da crianca: ' + numInserido.data[0].lastID ,[
                    {
                      text: "Voltar Para o inicio",
                      onPress: () => () => navigation.goBack(),
                      style: "confirm",
                    },
                  ]);
                //console.log(JSON.stringify(numInserido.data.lastID));
                //console.log(JSON.stringify(numInserido.data[0].lastID));
                //console.log(numInserido.data);
            }
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
                <Image source={require('../../../assets/images/icon.png')}
                                style={{width:100,height:50}}/>
            </View>

            <View style={styles.conteudoCard} >
                <View>
                    <Text>
                        Nome:
                    </Text>
                    <View style={styles.caixaTexto}>
                    <TextInput 
                            name="nome_Crianca"
                            placeholder='Nome da criança'
                            onChangeText={e => handleChangeValues(e, 'nome_Crianca')}
                         ></TextInput>
                    </View>
                </View>
                <View>
                    <Text>
                        Data de nascimento:
                    </Text>
                    <View style={styles.caixaTexto}>
                        <TextInput 
                            name="dataNasc_Crianca"
                            placeholder='Data de nascimento da criança'
                            onChangeText={e => handleChangeValues(e, 'dataNasc_Crianca')}
                         ></TextInput>
                    </View>
                </View>
                <View>
                    <Text>
                        Email:
                    </Text>
                    <View style={styles.caixaTexto}>
                    <TextInput 
                            name="email_Crianca"
                            placeholder='Email do Responsavel da criança'
                            onChangeText={e => handleChangeValues(e, 'email_Crianca')}
                         ></TextInput>
                    </View>
                    
                </View>
                <View>
                    <Text >
                        Senha:
                    </Text>
                    <View style={styles.caixaTexto}>
                    <TextInput 
                            name="senha_Crianca"
                            placeholder='Senha da criança'
                            secureTextEntry={true}
                            onChangeText={e => handleChangeValues(e, 'senha_Crianca')}
                         ></TextInput>
                    </View>
                    
                </View>
                <View>
                    <Text >
                        Confirme a senha:
                    </Text>
                    <View style={styles.caixaTexto}>
                    <TextInput 
                            name="senhaConfirma_Crianca"
                            placeholder='Senha da criança'
                            secureTextEntry={true}
                            onChangeText={e => handleChangeValues(e, 'senhaConfirma_Crianca')}
                         ></TextInput>
                    </View>
                    
                </View>
            </View>
            
            <View style={{alignSelf:'center'}}>
                <Botao
                    acao={() => handleClickButton()}
                    cor={cores.verde}
                    valor={'Confirmar'}
                /> 
            </View>
        </View>
        
    );
}