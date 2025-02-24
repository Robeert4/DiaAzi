import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

// Definindo os tipos
interface Compromissos {
  [date: string]: string[]; // Cada data é uma chave e os compromissos são um array de strings
}

interface MarkedDates {
  [date: string]: {
    selected: boolean;
    marked: boolean;
    dotColor: string;
    selectedColor: string;
  };
}

export default function Index() {
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [compromissos, setCompromissos] = useState<Compromissos>({});

  async function carregarCompromissos() {
    const compromissosSalvos = await AsyncStorage.getItem('compromissos');
    if (compromissosSalvos) {
      const compromissosObj = JSON.parse(compromissosSalvos);

      const novosMarkedDates: MarkedDates = {};
      Object.keys(compromissosObj).forEach(date => {
        novosMarkedDates[date] = { selected: true, marked: true, dotColor: 'pink', selectedColor: '#93477F' };
      });

      setMarkedDates(novosMarkedDates);
      setCompromissos(compromissosObj);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarCompromissos();
    }, [])
  );

  // Função para remover um compromisso de um dia específico
const apagarCompromisso = async (data: string, compromisso: string) => {
    const compromissosSalvos = await AsyncStorage.getItem('compromissos');
    if (compromissosSalvos) {
      const compromissosObj = JSON.parse(compromissosSalvos);
  
      // Filtrando os compromissos para remover o compromisso desejado
      const novosCompromissos = compromissosObj[data].filter(
        (item: string) => item !== compromisso
      );
  
      // Se não houver mais compromissos para aquele dia, remove a chave
      if (novosCompromissos.length === 0) {
        delete compromissosObj[data];
      } else {
        compromissosObj[data] = novosCompromissos;
      }
  
      // Atualizando o AsyncStorage
      await AsyncStorage.setItem('compromissos', JSON.stringify(compromissosObj));
  
      // Atualizando o estado local
      setCompromissos(compromissosObj);
  
      // Atualizando os dias marcados
      const novosMarkedDates: MarkedDates = {};
      Object.keys(compromissosObj).forEach(date => {
        novosMarkedDates[date] = {
          selected: true,
          marked: true,
          dotColor: 'pink',
          selectedColor: '#93477F'
        };
      });
      setMarkedDates(novosMarkedDates);
    }
  };
  

  return (
    <View style={{ justifyContent: 'flex-start', alignItems: 'center', flex: 1, paddingTop: 20 }}>
      <Calendar markedDates={markedDates} hideArrows={true} />
      <ScrollView style={{ width: '100%', paddingHorizontal: 20 }}>
  <View style={{ alignItems: 'center', gap: 15 }}>
    {Object.keys(compromissos).map((date) => (
      <View key={date} style={s.box1}>
        <Text style={s.dateText}>{date}</Text>
        {compromissos[date].map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Text style={s.taskText}>- {item}</Text>
            <Button
              title="Excluir"
              onPress={() => apagarCompromisso(date, item)} // Chama a função para apagar o compromisso
            />
          </View>
        ))}
      </View>
    ))}
  </View>
</ScrollView>

    </View>
  );
}

const s = StyleSheet.create({
  box1: {
    backgroundColor: 'pink',
    width: 300,
    minHeight: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  taskText: {
    fontSize: 14,
    marginTop: 5,
  },
});