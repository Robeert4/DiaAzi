import React from 'react';
import Api from './services/Api'
import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Calendar,} from 'react-native-calendars';

export default function Index() {
    return(
        <View style={{justifyContent: 'flex-start', alignItems: 'center',flex:1,gap:20 }}>
            <Calendar />
            <View style={s.box1}>
            </View>
            <View style={s.box1}>
            </View>
            <View style={s.box1}>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    centro: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        
    },
    box1: {
        
        backgroundColor: 'pink',
        minWidth:230,
        minHeight:50,
        borderRadius:20
    },

 
})
