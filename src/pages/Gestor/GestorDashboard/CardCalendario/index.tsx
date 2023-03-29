import { Box } from '@mui/material'
import Kalend, { CalendarView } from 'kalend'
import { useEffect, useState } from 'react'
import DefaultCard from '../../../../components/DefaultCard'
import DefaultTitle from '../../../../components/DefaultTitle'
import api from '../../../../services/api'
import { useUserDataStore } from '../../../../store/useUserData'
import { CalendarEvent, EmployeeScheduleType } from '../../../../types/types'
import { getAuthToken } from '../../../../util/auth'

const CardCalendario = () => {
    const token = getAuthToken()
    const [events, setEvents] = useState<CalendarEvent[]>([])
    const userData = useUserDataStore((state: any) => state.userData)

    useEffect(() => {
        if (userData.id) {
            ;(async () => {
                const { data } = await api.get(
                    `/employees/manager/${userData.id}/schedules/Approved`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                const schedules = data.map((employee: EmployeeScheduleType) => {
                    return {
                        name: employee.name,
                        schedules: employee.schedules.map(
                            (schedule) => schedule
                        ),
                    }
                })

                const events = schedules.map((schedule: any) => {
                    return schedule.schedules.map((schedules: any) => {
                        return {
                            id: schedules.id,
                            summary: schedule.name,
                            startAt: schedules.start.slice(0, 10),
                            endAt: schedules.end.slice(0, 10) + 'T23:59:59',
                            color: 'green',
                        }
                    })
                })

                const flattenEvents = events.flat()

                setEvents(flattenEvents)
            })()
        }
    }, [userData])

    console.log(events)

    return (
        <Box>
            <DefaultTitle>Eventos Futuros</DefaultTitle>
            <DefaultCard
                width={{
                    xs: 'calc(100vw - 2rem)',
                    md: '100%',
                }}
            >
                <Box height={600}>
                    <Kalend
                        events={events}
                        initialDate={new Date().toISOString()}
                        timeFormat={'24'}
                        weekDayStart={'Monday'}
                        language={'ptBR'}
                        initialView={CalendarView.MONTH}
                    />
                </Box>
            </DefaultCard>
        </Box>
    )
}

export default CardCalendario
