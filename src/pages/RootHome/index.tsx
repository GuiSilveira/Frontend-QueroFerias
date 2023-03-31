import { useEffect, useState } from 'react'
import { Outlet, useRouteLoaderData } from 'react-router-dom'
import DefaultTitle from '../../components/DefaultTitle'
import Header from '../../components/Header'
import api from '../../services/api'
import { useUserDataStore } from '../../store/useUserData'
import { UserLoaderDataType } from '../../types/types'
import { getAuthToken } from '../../util/auth'

const RootHome = () => {
    const verifiedTokenData = useRouteLoaderData(
        'rootHome'
    ) as UserLoaderDataType
    const setUserData = useUserDataStore((state: any) => state.setUserData)
    const [loading, setLoading] = useState(false)
    const token = getAuthToken()

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            const response = await api.get(
                `/employees/${verifiedTokenData.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            setUserData(response.data)
            setLoading(false)
        })()
    }, [])

    if (loading) {
        return (
            <DefaultTitle
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                Carregando...
            </DefaultTitle>
        )
    }

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default RootHome
