import { StyleSheet } from 'react-native';
import { cores } from '../../stylesCores';

export default StyleSheet.create({
  fundo:{
    backgroundColor: cores.roxoFundo,
    height:'100%',
    width: '100%',
  },
  flexCentro:{
    flex:1,
    display:'flex',
    justifyContent:'space-between',
    alignContent:'center',
    alignItems:'center'
  },
  conteudoCard:{
    backgroundColor: cores.roxoClaro,
    flexDirection:'column',
    height: '70%',
    alignItems:'center',
    borderTopStartRadius: 29,
    borderTopEndRadius: 29
  },
  alignSelfCenter:{
    alignSelf:'center'
  },
  botaoInicio:{
    margin: 10,
    padding: 10
  },
  font:{
    fontFamily: 'PoetsenOne',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fontTitle:{
    fontFamily: 'PoetsenOne',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10

  }
});