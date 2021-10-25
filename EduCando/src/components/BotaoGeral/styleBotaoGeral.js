import { StyleSheet } from 'react-native';


export default (pequeno, cor, fonteClara, widthBotao) => StyleSheet.create({
    
  botao: {
    width: widthBotao,
    paddingVertical: pequeno ? 3 : 9,
    paddingHorizontal: 20,
    backgroundColor: cor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 3
  },
  valor: {
    fontFamily: 'PoetsenOne',
    fontWeight: 'bold',
    textAlign: 'center',
    color: fonteClara ? 'white' : 'black',
  }
});