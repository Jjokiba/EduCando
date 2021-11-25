import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Botao from "../../../components/Botao/indexBotao";
import { cores, estiloGeral } from "../../../stylesCores";
import styles from "./style";
import Axios from  'axios';
import AppLoading from "expo-app-loading";
import ItemParabens from "../../../components/listItemParabens";

export default function listaParabens({ navigation, route }){
    

    const [IsReady, SetIsReady] = useState(false);

    const [listaParabensBanco, setListaParabens] = useState(null);
    //this.state ={ refresh : false }

    async function loadList() {
        setListaParabens(await Axios.post("http://192.168.1.195:3001/getParabens",{ FK_CodCrianca : route.params.user.FK_CodCrianca}));
    }


  if (!IsReady) {
    return <AppLoading startAsync={loadList()} 
             onFinish={() => {SetIsReady(true);}}
              onError={() => {}}/>;
  }
  else{
    return (
        <View style={estiloGeral.fundo}>
            <View style={styles.conteudoCabeçalho}>
                <View>
                    <Botao
                        cor={cores.vermelhoClaro}
                        valor={'< Voltar'}
                        acao={() => navigation.goBack()}
                    />
                </View>    
            </View>            
            <View>
                <Image source={require('../../../assets/images/corujao.png')}
                                    style={{width:150,height:150, alignSelf:'center'}}/>
            </View>

            <View style={styles.conteudoCard} >
                <View>
                    <Text>Historico de Parabenizações</Text>
                    {
                        !listaParabensBanco ? 
                            console.log("Loading List...")
                        :
                        <FlatList
                            style={{width: 300}}
                            data={listaParabensBanco.data}
                            //renderItem={({item}) => renderItem}
                            keyextractor={(x, i) => i}
                            //refresh={refresh}
                            renderItem={({ item }) =>
                            <ItemParabens
                            cod={item.codParabens}
                            titulo={item.titulo_Parabens}
                            desc={item.descricao_Parabens}
                            data_parabens={item.data_Parabens}
                            vizualizado={item.visto}
                            crianca={false}
                            funcaoReload={() => SetIsReady(false)}
                            />
                            }
                            
                        />
                    }
                    
                </View>
            </View>

            <View style={{alignSelf:'center'}}>
                {/*<Botao
                        cor={cores.verde}
                        acao={() => handleClickButton()}
                    />        */}
            </View>
        </View>
    );
  }
    
}