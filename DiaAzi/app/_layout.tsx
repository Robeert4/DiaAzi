import { Stack } from 'expo-router'

export default function Layout(){
    return(
        <Stack>
            <Stack.Screen name='index' options={{headerShown: false}}/>
            <Stack.Screen name='(tabs)' options={{headerShown: false}}/>
            <Stack.Screen name='compromisso' options={{headerShown: false}}/>
        </Stack>
    )
}
