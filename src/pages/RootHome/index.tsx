import { useEffect } from 'react'
import { Outlet, useRouteLoaderData } from 'react-router-dom'
import Header from '../../components/Header'
import api from '../../services/api'
import { useUserDataStore } from '../../store/useUserData'
import { UserLoaderDataType } from '../../types/types'
import { getAuthToken } from '../../util/auth'

const RootHome = () => {
    const veryfiedTokenData = useRouteLoaderData(
        'rootHome'
    ) as UserLoaderDataType
    const setUserData = useUserDataStore((state: any) => state.setUserData)

    useEffect(() => {
        const token = getAuthToken()
        ;(async () => {
            const response = await api.get(
                `/employees/${veryfiedTokenData.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            setUserData(response.data)
        })()
    }, [])

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default RootHome
