import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Botao from "../../../components/Botao/indexBotao";
import { cores, estiloGeral } from "../../../stylesCores";
import styles from "./style";
import Axios from  'axios';
import AppLoading from "expo-app-loading";
import ItemParabens from "../../../components/listItemParabens";


export default function listaParabensCrianca({ navigation, route }){
    

    const [IsReady, SetIsReady] = useState(false);

    const [listaParabens, setListaParabens] = useState(null);
    //this.state ={ refresh : false }

    async function loadList() {
        setListaParabens(await Axios.post("http://192.168.1.195:3001/getParabens",{ FK_CodCrianca : route.params.user.CodCrianca}));
        //console.log(JSON.stringify(listaParabens.data));
    }


  if (!IsReady) {
    return <AppLoading startAsync={loadList()} 
             onFinish={() => {SetIsReady(true);}}
              onError={() => {}}/>;
  }
  else{
      //console.log(JSON.stringify(listaTarefasConcluidas));
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
                <Image source={require('../../../assets/images/corujinha.png')}
                                    style={{width:150,height:150, alignSelf:'center'}}/>
            </View>

            <View style={styles.conteudoCard} >
                <View>
                    <Text>Historico de Parabens</Text>
                    {
                        
                        !listaParabens ? 
                            console.log('loading list...')
                        :
                            //console.log(JSON.stringify(listaOrdem)),
                            <FlatList
                                style={{width: 300}}
                                data={listaParabens.data}
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
                                        crianca={true}
                                        parabens={true}
                                        funcaoReload={() => SetIsReady(false)}
                                    />
                                }
                            
                        />
                    }
                    
                </View>
            </View>

            <View style={{alignSelf:'center'}}>
                {<Botao
                        cor={cores.verde}
                        acao={() => loadList()}
                    />        }
            </View>
        </View>
    );
  }
    
}