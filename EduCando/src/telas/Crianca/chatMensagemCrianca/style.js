import { StyleSheet } from 'react-native';
import { cores } from '../../../stylesCores';

export default StyleSheet.create({
    conteudoCabeçalho:{
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        margin: 15
    },
    conteudoCard:{
        backgroundColor: cores.roxoClaro,
        flexDirection:'column',
        height: '55%',
        alignItems:'center',
        justifyContent: 'space-around',
        margin: 10,
        padding: 10,
        borderRadius: 29
    },
    caixaTexto:{
        backgroundColor:'white', 
        width: 280
    }
});