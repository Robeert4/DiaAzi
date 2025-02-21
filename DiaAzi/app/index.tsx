import { Link, useRouter } from 'expo-router'
import { Image, View, StyleSheet,TouchableOpacity } from 'react-native'

export default function App(){
    const router = useRouter()

    return (
        <View style={{justifyContent: 'flex-start', alignItems: 'center',flex:1,gap:20, backgroundColor: 'pink'}}>
           <TouchableOpacity onPress={() => router.push('(tabs)')}>
            <Image source={require('../assets/logo.png')}/>
           </TouchableOpacity>
        
          
        </View>
    )
}
const styles = StyleSheet.create({


})