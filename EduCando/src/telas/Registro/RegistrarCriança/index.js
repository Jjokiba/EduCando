import React,  { useState } from "react";
import { Image, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Botao from "../../../components/Botao/indexBotao";
import { cores, estiloGeral } from "../../../stylesCores";
import styles from "./styles";





export default function RegistrarCriança({ navigation }){
    const [values, SetValues] = useState();
    const [showDatePicker, setShowDatePicker] = useState(false);
    
    const handleChangeValues = (value, name) => { 
        SetValues((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    const handleClickButton = async () => {
        var teste = await validaCampos(); 
        //console.log(teste);
        if(teste){
            Axios.post('http://192.168.1.195:3001/registrarAdulto', {
                nome_Crianca: values.nome_Res,
                email_: values.email_Res,
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
                            onChangeText={e => handleChangeValues(e, 'senha_Crianca')}
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
                            onChangeText={e => handleChangeValues(e, 'senha_Crianca')}
                         ></TextInput>
                    </View>
                    
                </View>
            </View>
            
            <View style={{alignSelf:'center'}}>
                <Botao
                    cor={cores.verde}
                    valor={'Confirmar'}
                /> 
            </View>
        </View>
        
    );
}