import { StyleSheet } from 'react-native';


export default (pequeno, cor, fonteClara, widthBotao, disabled) => StyleSheet.create({
  
  botao: {
    width: widthBotao,
    paddingVertical: pequeno ? 3 : 9,
    opacity: disabled ? 0.5 : 1,
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
    opacity: disabled ? 0.5 : 1,
    fontFamily: 'PoetsenOne',
    fontWeight: 'bold',
    textAlign: 'center',
    color: fonteClara ? 'white' : 'black',
  }
});