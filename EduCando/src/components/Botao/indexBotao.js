import React, { PureComponent } from 'react';

import { Text, TouchableHighlightBase, TouchableOpacity } from 'react-native';
import funcaoStylesBotao from './styleBotao';
import { cores } from '../../stylesCores';

export default function Botao({fonteClara = false,pequeno = false, cor = cores.verde,valor, acao}) {
    const styleBotaoPadrao = funcaoStylesBotao(pequeno, cor, fonteClara);
    return <TouchableOpacity onPress={acao} style={styleBotaoPadrao.botao}>
        <Text style={styleBotaoPadrao.valor}>{valor}</Text>
    </TouchableOpacity>
}