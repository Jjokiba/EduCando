import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Botao from "../../components/Botao/indexBotao";
import { fontes,cores, estiloGeral } from "../../stylesCores";
import styles from "./styles";

import { useNavigation } from '@react-navigation/native';
import Axios  from "axios";

//const { signIn } = React.useContext(AuthContext);

export default function LoginScreen({ navigation }){
    const [tipoConta, SetCriancaAdulto] = useState(false);
    const [values, SetValues] = useState({
        email_Res: null,
        senha_Res: null,
        nome_Crianca: null,
        senha_Crianca: null
    });

    const handleChangeValues = (value, name) => { 
        SetValues((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };


    const login = async () => { 
        //Alert.alert('Attention','AUTISMO');
        if(tipoConta == true) //Adulto-Login
        {
            let result = await Axios.get('http://192.168.1.195:3001/loginAdulto', {
                email_Res: values.email_Res,
                senha_Res: values.senha_Res,  
            });
            Alert.alert('Attention',result.data);
            if(result.data[0] != null){
                Alert.alert('Attention',result.data[0]);
            }

        }
        else
        {
            let result = await Axios.get('http://192.168.1.195:3001/loginCrianca', {
                email_Crianca: values.email_Crianca,
                senha_Crianca: values.senha_Crianca,  
            });
            Alert.alert('Attention',result.data);
            if(result.data[0] != null){
                Alert.alert('Attention',result.data[0]);
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
                        acao={ () => navigation.canGoBack() ? navigation.goBack() : 'a' }
                    />
                </View>
                
            </View>
            
            <View>
                <Image source={require('../../assets/images/icon.png')}
                                    style={{width:200,height:150, alignSelf:'center'}}/>
            </View>
            
            <View style={styles.conteudoCard} >
            <Text style={fontes.PoetsenOne}>
                        Selecione o tipo de conta:
                </Text>
                <View style={styles.switchConta}>
                    <Botao
                            cor={tipoConta ? cores.vermelhoClaro : cores.verde}
                            valor={'Criança'}
                            acao={() => SetCriancaAdulto(false)}
                        />    
                    <Botao
                            cor={tipoConta ? cores.verde : cores.vermelhoClaro}
                            valor={'Adulto'}
                            acao={() => SetCriancaAdulto(true)}
                        />    
                </View>
                <View>
                    <Text style={fontes.PoetsenOne}>
                        Email:
                    </Text>
                    <View style={styles.caixaTexto}>
                        <TextInput 
                            name={(tipoConta ? 'email_Res' : 'email_Crianca')}
                            placeholder={(tipoConta ? 'Email do responsavel da crianca' : 'Email da conta da criança')}
                            onChangeText={e => handleChangeValues(e, (tipoConta ? 'email_Res' : 'email_Crianca'))}
                         ></TextInput>
                    </View> 
                </View>
                
                <View>
                    <Text style={fontes.PoetsenOne}>
                        Senha:
                    </Text>
                    <View style={styles.caixaTexto}>
                    <TextInput 
                            name={(tipoConta ? 'senha_Res' : 'senha_Crianca')}
                            placeholder={(tipoConta ? 'Senha do responsavel da crianca' : 'Senha da conta da criança')}
                            onChangeText={e => handleChangeValues(e, (tipoConta ? 'email_Res' : 'email_Crianca'))}
                         ></TextInput>
                    </View>
                    
                </View>
            </View>

            <View style={{alignSelf:'center'}}>
                <Botao
                    cor={cores.verde}
                    valor={'Login'}
                    acao={() =>  login()}
                />        
            </View>
            
        </View>
    );
}

