import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import { useFonts } from "expo-font";
import { useRouter } from 'expo-router';

export default function Adicionar() {
    let [fontsLoaded] = useFonts({ Poppins_400Regular });

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [markedDates, setMarkedDates] = useState({});
    const [compromisso, setCompromisso] = useState('');
    const [dataForm, setDataForm] = useState<string | null>(null);
    const router = useRouter()

    // Quando clicar em uma data no calendário
    function handleDateSelect(day: DateData) {
        const formattedDate = day.dateString;

        setMarkedDates({
            [formattedDate]: { selected: true, selectedColor: '#93477F', marked: true }
        });

        setSelectedDate(formattedDate);

    }

    function dataFormatada(dateString: string) {
        const dateObject = new Date(dateString + 'T00:00:00');
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const formattedDate = dateObject.toLocaleDateString('pt-BR', options);
        return formattedDate;
    }

    // Função para salvar compromisso no AsyncStorage
    // Adicionar.tsx
    async function salvarCompromisso() {
        if (!selectedDate || !compromisso.trim()) {
            alert('Por favor, selecione uma data e digite um compromisso.');
            return;
        }

        const compromissosSalvos = await AsyncStorage.getItem('compromissos');
        const compromissos: { [key: string]: string[] } = compromissosSalvos ? JSON.parse(compromissosSalvos) : {};

        // Adicionando o compromisso ao dia selecionado
        compromissos[selectedDate] = [...(compromissos[selectedDate] || []), compromisso];

        // Salvando no AsyncStorage
        await AsyncStorage.setItem('compromissos', JSON.stringify(compromissos));

        setCompromisso('');  // Limpa o campo de texto
        router.replace('/(tabs)');  // Redireciona de volta para a tela principal (index)
    }


    return (
        <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor:'#ECC9E0' }}>
            <View style={styles.bloco1}>
                <Text>Marque sua nova meta no calendário!</Text>
            </View>

            {/* Calendário */}
            <Calendar onDayPress={handleDateSelect} markedDates={markedDates} style={styles.arredondar} />

            {/* Formulário só aparece quando uma data for selecionada */}
            {selectedDate && (
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Adicionar compromisso para {dataFormatada(selectedDate)}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu compromisso"
                        value={compromisso}
                        onChangeText={setCompromisso}
                    />
                    <TouchableOpacity onPress={salvarCompromisso} style={styles.button}>
                        Salvar
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    bloco1: {
        backgroundColor: '#DC95C7',
        minWidth: 290,
        minHeight: 50,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    formContainer: {
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
        
        
    },
    title: {
        fontSize: 18,
        fontWeight: '400',
        marginBottom: 10,

    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: '50%',
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor:'white'
    },
    button: {
        borderRadius: 20,
        backgroundColor: '#C662AC',
        padding: 15,
        color:'white'
    },
    arredondar: {
        borderRadius: 15,
      }
});
