import * as dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { useUserDataStore } from '../../store/useUserData'
import { ScheduleType } from '../../types/types'

const Home = () => {
    const { id, contractDate } = useUserDataStore(
        (state: any) => state.userData
    )
    const [approvedSchedules, setApprovedSchedules] = useState<ScheduleType[]>(
        []
    )

    useEffect(() => {
        if (id) {
            ;(async () => {
                const response = await api.get(`/schedules/employee/${id}`)

                setApprovedSchedules(response.data)
            })()
        }
    }, [])

    console.log(approvedSchedules)

    if (approvedSchedules.length === 0) {
        const contractDateToPermitUse = dayjs(contractDate).add(12, 'month')

        if (
            dayjs().isSame(contractDateToPermitUse) ||
            dayjs().isAfter(contractDateToPermitUse)
        ) {
            if (
                dayjs().isAfter(contractDateToPermitUse.add(11, 'month')) &&
                dayjs().isBefore(contractDateToPermitUse.add(12, 'month'))
            ) {
                // TODO: Enviar email para o gestor e para o funcionário
                console.log('Você está prestes a acumular período de férias!')
            }
        }
    }

    if (approvedSchedules.length > 0) {
        const lastApprovedSchedule =
            approvedSchedules[approvedSchedules.length - 1]
        const lastApprovedScheduleEndDate = dayjs(lastApprovedSchedule.end)

        // Verificar se o último período de férias aprovado está dentro do período aquisitivo atual e se o período aquisitivo atual está prestes de vencer
        const periodoAquisitivo = dayjs(contractDate).set(
            'year',
            dayjs(new Date()).year()
        )

        if (lastApprovedScheduleEndDate.isBefore(periodoAquisitivo)) {
            if (
                dayjs().isAfter(periodoAquisitivo.add(11, 'month')) &&
                dayjs().isBefore(periodoAquisitivo.add(12, 'month'))
            ) {
                console.log('Você está prestes a acumular período de férias!')
                // TODO: Enviar email para o gestor e para o funcionário

                // TODO: não permitir que vença o período
            }
        }
    }

    return <h1>Home</h1>
}

export default Home
