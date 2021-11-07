import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { mask } from "remask";

export const InputMask = ({ maskk, onChangeText, ...props}) => {
    const handleChange = ev =>{
        const maskedValue = mask(ev, maskk);
        onChangeText(maskedValue);
    }

    return <TextInput {...props} onChangeText={handleChange} />
};//Currently not Working, FIX to do fdse