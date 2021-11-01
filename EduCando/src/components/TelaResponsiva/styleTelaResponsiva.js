import { StyleSheet } from "react-native";
import { cores } from "../../stylesCores";
import { Dimensions } from 'react-native';


export default StyleSheet.create({
    ajusteTela:{
        //flex: 1,
        backgroundColor: cores.roxoFundo,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
        },
    ajusteTelaBaixo: {
        flex: 0,
        backgroundColor: cores.roxoFundo,
    },
    preencher:{
        //flex:1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    }
});