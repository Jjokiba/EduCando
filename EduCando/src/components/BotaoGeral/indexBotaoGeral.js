import React, { PureComponent } from 'react';

import { Text, TouchableHighlightBase, TouchableOpacity } from 'react-native';
import funcaoStylesBotaoGeral from './styleBotaoGeral';
import { cores } from '../../stylesCores';

export default function BotaoGeral({fonteClara = false,pequeno = false, cor = cores.verde,valor, acao, widthBotao = 140, disabled = false}) {
    const styleBotaoPadrao = funcaoStylesBotaoGeral(pequeno, cor, fonteClara, widthBotao, disabled);
    return <TouchableOpacity onPress={!disabled ? acao : console.log('Botão desativado')} style={styleBotaoPadrao.botao}>
        <Text style={styleBotaoPadrao.valor}>{valor}</Text>
    </TouchableOpacity>
}