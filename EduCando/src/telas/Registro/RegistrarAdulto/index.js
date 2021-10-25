import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Botao from "../../../components/Botao/indexBotao";
import { cores, estiloGeral } from "../../../stylesCores";
import styles from "./styles";
import Axios from  'axios';

export default function RegistrarAdulto({ navigation }){
    const [values, SetValues] = useState();
    
    const handleChangeValues = (value, name) => { 
        SetValues((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    async function validaCampos(){
        var msg = 'Alguns pontos estão faltando:' ;
        var validacao = true;

        if(values.FK_CodCrianca == null){
            msg += "\nCodigo da criança nao foi informado, favor realizar o cadastro da criança e retornar com o codigo\n";
            validacao = false;
        }
        else{
            let response = await Axios.get('http://192.168.1.195:3001/getCriancaById', {FK_CodCrianca: values.FK_CodCrianca});
            if((response.data.length == 0)){
                    
                msg += "\nCriança não encontrada no banco de dados, certifique-se de cadastra-la primeiro\n";
                validacao = false;
            }
            /*
            Axios.get('http://192.168.1.195:3001/getCriancaById', {FK_CodCrianca: values.FK_CodCrianca}).then((response) => {
                console.log((response.data.length == 0));
                if((response.data.length == 0)){
                    
                    msg += "\nCriança não encontrada no banco de dados, certifique-se de cadastra-la primeiro\n";
                    validacao = false;
                }
            })*/
        }

        if(values.nome_Res == null){
            msg += "\nNome do Responsavel não foi completado\n";
            validacao = false;
        }

        

        if(values.email_Res == null){
            msg += "\nEmail do Responsavel não informado\n";
            validacao = false;
        }

        if(values.senha_Res == null || values.senha_Res != values.senha_Res_Confirma){
            msg += "\nConfirme a senha\n";
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
        if(teste){
            Axios.post('http://192.168.1.195:3001/registrarAdulto', {
                nome_Res: values.nome_Res,
                email_Res: values.email_Res,
                senha_Res: values.senha_Res,
                FK_CodCrianca: values.FK_CodCrianca
            }).then((response) =>{
                if(response.data != ""){
                    Alert.alert('Sucesso', 'Responsável cadastrado com sucesso',[
                        {
                          text: "Voltar Para o inicio",
                          onPress: () => navigation.goBack(),
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
                        acao={ () => navigation.canGoBack() ? navigation.goBack() : 'a' }
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
                            placeholder='Nome do Responsável'
                            onChangeText={e => handleChangeValues(e, 'nome_Res')}
                         ></TextInput>
                    </View>
                </View>
                <View>
                    <Text>
                        Codigo da Criança:
                    </Text>
                    <View style={styles.caixaTexto}>
                        <TextInput 
                            placeholder='Código Informado no Registro'
                            onChangeText={e => handleChangeValues(e, 'FK_CodCrianca')}
                        ></TextInput>
                    </View>
                </View>
                <View>
                    <Text>
                        Email:
                    </Text>
                    <View style={styles.caixaTexto}>
                    <TextInput 
                            placeholder='Email do Responsavel'
                            onChangeText={e => handleChangeValues(e, 'email_Res')}
                         ></TextInput>
                    </View>
                    
                </View>
                <View>
                    <Text >
                        Senha:
                    </Text>
                    <View style={styles.caixaTexto}>
                    <TextInput 
                            placeholder='Senha de Cadastro'
                            onChangeText={e => handleChangeValues(e, 'senha_Res')}
                            secureTextEntry={true}
                         ></TextInput>
                    </View>
                    
                </View>
                <View>
                    <Text >
                        Confirme a Senha:
                    </Text>
                    <View style={styles.caixaTexto}>
                    <TextInput 
                            placeholder='Confirmacao da senha de Cadastro'
                            onChangeText={e => handleChangeValues(e, 'senha_Res_Confirma')}
                            secureTextEntry={true}
                         ></TextInput>
                    </View>
                    
                </View>
            </View>

            <View style={{alignSelf:'center'}}>
                <Botao
                    cor={cores.verde}
                    valor={'Confirmar'}
                    acao={() => handleClickButton()}
                />        
            </View>

        </View>
    );
}