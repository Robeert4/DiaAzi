import { Tabs } from 'expo-router'
import { Ionicons} from '@expo/vector-icons'


export default function TabsBar(){
    return(
        <Tabs screenOptions={{ tabBarActiveTintColor: '#C662AC',tabBarStyle: { backgroundColor: '#DC95C7' },tabBarInactiveTintColor: 'white' }}>

            <Tabs.Screen name='index' options={{title: 'Inicio', headerShown: false, tabBarIcon: ({color, size, focused}) =>(<Ionicons name={ focused ? "home" : "home-outline"} size={size} color={color}/> ) }}/>
            <Tabs.Screen name='adicionar' options={{title: 'Adicionar',headerShown: false, tabBarIcon: ({color, size, focused}) =>(<Ionicons name={ focused ? "add" : "add-outline"} size={size} color={color}/> ) }}/>
        </Tabs>
        
    )
}

