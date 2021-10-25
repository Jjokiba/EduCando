import React from "react";
import { Image, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Botao from "../../components/Botao/indexBotao";
import { fontes,cores, estiloGeral } from "../../stylesCores";
import styles from "./styles";

import { useNavigation } from '@react-navigation/native';

export default function LoginScreen({ navigation }){
    

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
                <View>
                    <Text style={fontes.PoetsenOne}>
                        Email:
                    </Text>
                    <View style={styles.caixaTexto}>
                        <TextInput></TextInput>
                    </View>
                </View>
                
                <View>
                    <Text style={fontes.PoetsenOne}>
                        Senha:
                    </Text>
                    <View style={styles.caixaTexto}>
                        <TextInput></TextInput>
                    </View>
                    
                </View>
            </View>

            <View style={{alignSelf:'center'}}>
                <Botao
                    cor={cores.verde}
                    valor={'Login'}
                />        
            </View>

        </View>
    );
}