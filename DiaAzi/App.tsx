import { Image, View, StyleSheet } from 'react-native'
import Layout from './layout'

export default function App(){
    return (
        <View style={{justifyContent: 'flex-start', alignItems: 'center',flex:1,gap:20, backgroundColor: 'pink'}}>
           <Image source={require('./assets/logo.png')}/>
        
          
        </View>
    )
}
const styles = StyleSheet.create({


})