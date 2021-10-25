import React, { PureComponent } from 'react';

import { Text, TouchableHighlightBase, TouchableOpacity } from 'react-native';
import funcaoStylesBotaoGeral from './styleBotaoGeral';
import { cores } from '../../stylesCores';

export default function BotaoGeral({fonteClara = false,pequeno = false, cor = cores.verde,valor, acao, widthBotao = 140}) {
    const styleBotaoPadrao = funcaoStylesBotaoGeral(pequeno, cor, fonteClara, widthBotao);
    return <TouchableOpacity onPress={acao} style={styleBotaoPadrao.botao}>
        <Text style={styleBotaoPadrao.valor}>{valor}</Text>
    </TouchableOpacity>
}