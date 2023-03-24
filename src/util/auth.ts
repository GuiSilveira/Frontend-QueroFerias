import { redirect } from 'react-router-dom'
import api from '../services/api'

export function getAuthToken() {
    const token = localStorage.getItem('token')

    if (!token) {
        return null
    }

    return token
}

export async function checkAuthLoader() {
    const token = getAuthToken()

    if (!token) {
        return redirect('/')
    }

    const tokenData = await api.post('/auth/verify', null, {
        headers: { Authorization: token },
    })

    return tokenData
}
