import { axios } from 'axios'

const api = axios.create({
    baseURL:'https://github.com/wix/react-native-calendars.git'
})

export default api