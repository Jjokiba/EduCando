import React, { PureComponent } from 'react';
import { cores } from '../../stylesCores'
import { StyleSheet ,SafeAreaView, StatusBar,KeyboardAvoidingView,Platform, ScrollView  } from 'react-native';
import stylesPadrao from './styleTelaResponsiva';


export default function TelaResponsiva ({ children }) {
    return <>
    
        <SafeAreaView style={stylesPadrao.ajusteTela}>
            
            <StatusBar  backgroundColor={cores.roxo} />
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={stylesPadrao.preencher}
                >       
                    {children}   
            </KeyboardAvoidingView>
            
        </SafeAreaView>
        
    <SafeAreaView style={stylesPadrao.ajusteTelaBaixo}/>
    
    </>
}

const stylePequeno = StyleSheet.create({
    scrol: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: 1000
        
    }
      
})