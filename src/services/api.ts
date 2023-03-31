import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000',
})

export const emailApi = axios.create({
    baseURL: 'http://localhost:8000',
})

export default api
