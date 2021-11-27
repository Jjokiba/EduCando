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
        flexDirection:'column',
        height: '50%',
        alignItems:'center',
        justifyContent: 'space-around',
        margin: 10,
        padding: 10,
        borderRadius: 29
    },
    caixaTexto:{
        backgroundColor:'white', 
        width: 250,
    },
    botoesInline:{
        flex:1,
        flexDirection:'row', 
        flexWrap:'wrap',
        width:  290,
        justifyContent: 'space-between',
        margin: 10
    }
});