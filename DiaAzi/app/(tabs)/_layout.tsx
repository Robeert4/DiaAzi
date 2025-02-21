import { Tabs } from 'expo-router'

export default function TabsBar(){
    return(
        <Tabs>
            <Tabs.Screen name='index' options={{headerShown: false}}/>
            <Tabs.Screen name='adicionar' options={{headerShown: false}}/>
        </Tabs>
    )
}
