import React from 'react';
import Api from '../../services/Api';
import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { Calendar,} from 'react-native-calendars'
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import {useFonts} from "expo-font"


export default function Adicionar() {
    let[fontsLoaded] = useFonts({Poppins_400Regular})

    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [selectedDate, setSelectedDate] = useState({})

    function saveDate(){
        if (!day || !month || !year) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

        setSelectedDate({ 
            [formattedDate]: {selected: true, selectedColor: '#93477F', marked: true} 
        });
    }

    return(
        <View style ={{justifyContent: 'flex-start', alignItems: 'center' }}>  
            <View style={styles.bloco1}>
                <Text>Marque sua nova meta no calendário!</Text> 
            </View>
            <Calendar onDayPress={saveDate} markedDates={selectedDate} />

            <TextInput placeholder='Dia' keyboardType="numeric" maxLength={2} onChangeText={setDay}></TextInput>
            <TextInput placeholder='Mês' keyboardType="numeric" maxLength={2}  onChangeText={setMonth}></TextInput>
            <TextInput placeholder='Ano' keyboardType="numeric" maxLength={4} onChangeText={setYear}></TextInput>
            <Button title="Enviar" onPress={saveDate}/>
        </View>
    )
}

const styles = StyleSheet.create({

    centro: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center'
    },
    bloco1: {
        backgroundColor: 'pink',
        minWidth:290,
        minHeight:50,
        borderRadius:30,
        alignItems: 'center',
        justifyContent: 'center'
}


})