import { Box, CircularProgress, Container, Stack } from '@mui/material'
import CardNotificações from './CardNotificações'
import CardTime from './CardTime'
import CardCalendario from './CardCalendario'
import { useEffect, useState } from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import api from '../../../services/api'
import {
    EmployeeScheduleType,
    ScheduleType,
    UserLoaderDataType,
} from '../../../types/types'
import DefaultTitle from '../../../components/DefaultTitle'
import { getAuthToken } from '../../../util/auth'
import { CalendarEvent } from 'kalend'
import dayjs from 'dayjs'

const GestorDashboard = () => {
    const token = getAuthToken()
    const verifiedTokenData = useRouteLoaderData(
        'rootHome'
    ) as UserLoaderDataType
    const data = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') as string)
        : verifiedTokenData.id
    const [employeeCount, setEmployeesCount] = useState<number>(0)
    const [employeesOnVacation, setEmployeesOnVacation] = useState<any[]>([])
    const [employeesWorking, setEmployeesWorking] = useState<any[]>([])
    const [employeesDelayed, setEmployeesDelayed] = useState<any[]>([])
    const [notificationsCount, setNotificationsCount] = useState(0)
    const [events, setEvents] = useState<CalendarEvent[]>([])
    const [schedulesInCurrentYear, setSchedulesInCurrentYear] = useState<
        ScheduleType[]
    >([])
    const [loadingManagerEmployees, setLoadingManagerEmployees] =
        useState(false)
    const [loadingPendingSchedules, setLoadingPendingSchedules] =
        useState(false)
    const [loadingApprovedSchedules, setLoadingApprovedSchedules] =
        useState(false)
    const [
        loadingAllTimeApprovedSchedules,
        setLoadingAllTimeApprovedSchedules,
    ] = useState(false)

    // Carrega todos os agendamentos pendentes dos funcionários do gestor
    useEffect(() => {
        ;(async () => {
            setLoadingPendingSchedules(true)
            const response = await api.get(
                `/employees/manager/${data.id}/schedules/Pending`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            const schedules = response.data.map(
                (employee: EmployeeScheduleType) => {
                    return employee.schedules.map((schedule) => schedule)
                }
            )

            const flattenSchedules = schedules.flat()

            setNotificationsCount(flattenSchedules.length)
            setLoadingPendingSchedules(false)
        })()

        return () => {}
    }, [])

    // Carrega todos os funcionários do gestor
    useEffect(() => {
        ;(async () => {
            setLoadingManagerEmployees(true)
            const response = await api.get(`/employees/manager/${data.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            setEmployeesCount(response.data.length)

            const funcionariosDeFerias = response.data.filter(
                (employee: any) => employee.vacationStatus === 'Vacation'
            )

            const funcionariosTrabalhando = response.data.filter(
                (employee: any) => employee.vacationStatus === 'Working'
            )

            const funcionariosComFeriasAtrasadas = response.data.filter(
                (employee: any) => employee.vacationStatus === 'Delayed'
            )

            setEmployeesOnVacation(funcionariosDeFerias)
            setEmployeesWorking(funcionariosTrabalhando)
            setEmployeesDelayed(funcionariosComFeriasAtrasadas)
            setLoadingManagerEmployees(false)
        })()
    }, [])

    useEffect(() => {
        return () => {}
    }, [])

    // Busca as férias aprovadas e gera os eventos para o calendário
    // TODO: Aproveitar essas férias para alterar o status das férias do funcionário
    useEffect(() => {
        ;(async () => {
            setLoadingApprovedSchedules(true)
            const response = await api.get(
                `/employees/manager/${data.id}/schedules/Approved`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            const schedules = response.data.map(
                (employee: EmployeeScheduleType) => {
                    return {
                        name: employee.name,
                        schedules: employee.schedules.map(
                            (schedule) => schedule
                        ),
                    }
                }
            )

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
            setLoadingApprovedSchedules(false)
        })()

        return () => {}
    }, [])

    useEffect(() => {
        ;(async () => {
            setLoadingAllTimeApprovedSchedules(true)
            const response = await api.get(
                `/employees/manager/${data.id}/schedules/Approved`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            // Filtra os empregados que possuem agendamentos aprovados
            const employeesWithApprovedSchedules = response.data.filter(
                (employee: any) => employee.schedules.length > 0
            )

            const schedulesInTheCurrentYear = employeesWithApprovedSchedules
                .map((employee: any) => {
                    return employee.schedules.filter(
                        (schedule: any) =>
                            dayjs(schedule.start).year() === dayjs().year()
                    )
                })
                .flat()

            setSchedulesInCurrentYear(schedulesInTheCurrentYear)
            setLoadingAllTimeApprovedSchedules(false)
        })()

        return () => {}
    }, [])

    if (
        loadingManagerEmployees ||
        loadingPendingSchedules ||
        loadingApprovedSchedules ||
        loadingAllTimeApprovedSchedules
    ) {
        return (
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                }}
            >
                <DefaultTitle>Carregando...</DefaultTitle>
                <CircularProgress color="success" />
            </Box>
        )
    }

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: {
                    xs: 'center',
                    md: 'flex-start',
                },
                alignItems: {
                    xs: 'center',
                    md: 'flex-start',
                },
                marginTop: '71px',
                marginLeft: {
                    md: '240px',
                },
                maxWidth: {
                    md: 'calc(100% - 240px)',
                },
                padding: {
                    md: '0 0 0 1rem',
                },
            }}
        >
            <Stack
                gap="30px"
                sx={{
                    width: {
                        xs: 'calc(100vw - 2rem)',
                        md: '100%',
                    },
                    paddingRight: {
                        md: '2rem',
                    },
                    paddingBottom: {
                        xs: '2rem',
                    },
                }}
            >
                <Box
                    width={{
                        md: '100%',
                        lg: '50%',
                    }}
                    display="flex"
                    flexDirection={{
                        xs: 'column',
                    }}
                    gap="1rem"
                    justifyContent={'space-evenly'}
                >
                    <CardNotificações notificationsCount={notificationsCount} />

                    <CardTime
                        employeesCount={employeeCount}
                        employeesOnVacation={employeesOnVacation}
                        employeesWorking={employeesWorking}
                        employeesDelayed={employeesDelayed}
                        schedulesInCurrentYear={schedulesInCurrentYear}
                    />
                </Box>
                <CardCalendario events={events} />
            </Stack>
        </Container>
    )
}

export default GestorDashboard
