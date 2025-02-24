import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
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
    const router = useRouter()

    // Quando clicar em uma data no calendário
    function handleDateSelect(day: DateData) {
        const formattedDate = day.dateString;

        setSelectedDate(formattedDate);
        setMarkedDates({
            [formattedDate]: { selected: true, selectedColor: '#93477F', marked: true }
        });
    }

    // Função para salvar compromisso no AsyncStorage
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

        setCompromisso('');
        router.replace('/(tabs)');
    }

    return (
        <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
            <View style={styles.bloco1}>
                <Text>Marque sua nova meta no calendário!</Text>
            </View>

            {/* Calendário */}
            <Calendar onDayPress={handleDateSelect} markedDates={markedDates} />

            {/* Formulário só aparece quando uma data for selecionada */}
            {selectedDate && (
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Adicionar compromisso para {selectedDate}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu compromisso"
                        value={compromisso}
                        onChangeText={setCompromisso}
                    />
                    <Button title="Salvar" onPress={salvarCompromisso} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    bloco1: {
        backgroundColor: 'pink',
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
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: '100%',
        marginBottom: 10,
        borderRadius: 5,
    },
});
