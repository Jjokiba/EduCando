import React, { PureComponent } from 'react';
import { cores } from '../../stylesCores'
import { SafeAreaView, StatusBar,KeyboardAvoidingView,Platform } from 'react-native';
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