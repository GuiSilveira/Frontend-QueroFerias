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

    const { data } = await api.post('/auth/verify', null, {
        headers: { Authorization: token },
    })

    if (!data) {
        return redirect('/')
    }

    const userData = {
        id: data.id,
        contract: data.contract,
    }

    localStorage.setItem('user', JSON.stringify(userData))

    return { ...data }
}

export async function checkRoleLoader(
    ...positions: ('Admin' | 'Employee' | 'Manager')[]
) {
    const tokenData = await checkAuthLoader()
    let hasRole = false

    positions.forEach((position) => {
        if (
            position !== 'Admin' &&
            position !== 'Employee' &&
            position !== 'Manager'
        ) {
            throw new Error('Invalid role')
        }

        if (tokenData.position === position) {
            hasRole = true
        }
    })

    return !hasRole ? redirect('/home') : null
}
