import { axios } from 'axios'

const Api = axios.create({
    baseURL:'https://github.com/wix/react-native-calendars.git'
})

export default Api