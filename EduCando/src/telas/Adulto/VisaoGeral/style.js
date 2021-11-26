import { StyleSheet } from 'react-native';
import { cores } from '../../../stylesCores';

export default StyleSheet.create({
    conteudoCabeçalho:{
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        margin: 15
    },
    conteudo:{
        flexDirection:'column',
        height: '60%',
        alignItems:'flex-start',
        margin: 10,
        fontWeight:'bold',
        //backgroundColor:'white', 
        borderRadius: 29
    },
    linhaTitulo:{
        flexDirection:'column',
        height: '19%',
        width: '100%',
        alignSelf: 'baseline',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:cores.roxoClaro, 
        borderTopRightRadius: 29,
        borderTopLeftRadius: 29,
        borderBottomRightRadius: 29 
    },
    caixaConteudo:{
        flexDirection:'column',
        height: '100%',
        width: '50%',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor:cores.roxoClaro,
    },
    footerConteudo:{
        flexDirection:'column',
        height: '50%',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        backgroundColor:cores.roxoClaro,
        borderBottomLeftRadius: 29,
        borderBottomRightRadius: 29,
        borderTopRightRadius: 29
    },
    text:{
        fontWeight:'bold',
        fontSize: 16,
    }
});