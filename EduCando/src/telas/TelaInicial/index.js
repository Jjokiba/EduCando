import React from "react";
import { Text, Button, Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import icon from "../../assets/images/icon.png";

import Botao from "../../components/Botao/indexBotao.js";
import { cores }  from "../../stylesCores.js";
import styles from "./styles";

import { useNavigation } from '@react-navigation/native';

export default function TelaInicial() {
    const navigation = useNavigation();

    return <View style={styles.fundo}>
                <View style={styles.flexCentro}>
                    <Image source={require('../../assets/images/icon.png')}
                            style={{width:200,height:150}}/>
                    <Text style={styles.fontTitle}>EduCando</Text>
                </View>

                
                <View style={styles.flexCentro, styles.conteudoCard}>
                    <View style={styles.alignSelfCenter}>
                        <Text style={styles.alignSelfCenter, styles.fontTitle}>
                            Bem Vindo
                        </Text>
                        <Text style={styles.alignSelfCenter, styles.font}>
                            Cadastre-se
                        </Text>
                    </View>

                    

                    <View>
                        <View style={styles.botaoInicio}>
                            <Botao 
                            cor={cores.verde}
                            valor={'Criança'}
                            style={styles.botaoInicio}
                            acao={ () => navigation.navigate('Registrar Criança', {navigation})}
                            />
                        </View>
                        <View style={styles.botaoInicio}>
                            <Botao 
                            cor={cores.verde}
                            valor={'Responsável'}
                            acao={ () => navigation.navigate('Registrar Adulto', {navigation})}
                            />  
                        </View>
                    </View>
                    <View>
                    
                    <Text style={styles.alignSelfCenter, styles.font}>
                     ou
                    </Text>
                    <View style={styles.botaoInicio}>
                        <Botao 
                            cor={cores.azulClaro}
                            pequeno={true}
                            valor={'Já Tenho uma Conta'}
                            acao={ () => navigation.navigate('Login', {navigation})}
                        />
                    </View>
                    
                    </View>
                </View>
           </View>

}