import * as dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import DefaultTitle from '../../components/DefaultTitle'
import api, { emailApi } from '../../services/api'
import { useUserDataStore } from '../../store/useUserData'
import { ScheduleType, UserLoaderDataType } from '../../types/types'
import { getAuthToken } from '../../util/auth'

const Home = () => {
    const token = getAuthToken()
    const [approvedSchedules, setApprovedSchedules] = useState<ScheduleType[]>(
        []
    )
    const [loadingApprovedSchedules, setLoadingApprovedSchedules] =
        useState(false)
    const userData = useUserDataStore((state: any) => state.userData)
    const verifiedTokenData = useRouteLoaderData(
        'rootHome'
    ) as UserLoaderDataType
    const data = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') as string)
        : verifiedTokenData.id
    const [employeesApprovedSchedules, setEmployeesApprovedSchedules] =
        useState<ScheduleType[]>([])
    const [managerEmployees, setManagerEmployees] = useState<any[]>([])

    useEffect(() => {
        ;(async () => {
            setLoadingApprovedSchedules(true)
            const response = await api.get(`/schedules/employee/${data.id}`)

            setApprovedSchedules(response.data)
            setLoadingApprovedSchedules(false)
        })()
    }, [])

    useEffect(() => {
        if (!data.position) return

        if (data.position === 'Manager') {
            ;(async () => {
                const response = await api.get(
                    `/employees/manager/${data.id}/all_approved/schedules`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                setEmployeesApprovedSchedules(response.data)
            })()
        }
    }, [])

    useEffect(() => {
        if (!data.position) return

        if (data.position === 'Manager') {
            ;(async () => {
                const response = await api.get(
                    `/employees/manager/${data.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                setManagerEmployees(response.data)
            })()
        }
    }, [])

    // MANAGER VENDO, NAS SOLICITAÇÕES MAIS RECENTES SE OS FUNCIONÁRIOS ESTÃO DE FÉRIAS E ATUALIZANDO CASO SIM
    if (employeesApprovedSchedules.length > 0) {
        employeesApprovedSchedules.map((schedule) => {
            if (
                dayjs(schedule.start).isSame(dayjs()) ||
                (dayjs().isAfter(dayjs(schedule.start)) &&
                    dayjs().isBefore(dayjs(schedule.end)))
            ) {
                ;(async function () {
                    await api.patch(
                        `/employees/${schedule.idEmployee}`,
                        {
                            vacationStatus: true,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                })()
            } else {
                if (managerEmployees.length > 0) {
                    const employee = managerEmployees.find((employee) => {
                        return employee.id === schedule.idEmployee
                    })
                    ;(async function () {
                        if (employee.vacationStatus === true) {
                            await api.patch(
                                `/employees/${schedule.idEmployee}`,
                                {
                                    vacationStatus: false,
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            )
                        }
                    })()
                }
            }
        })
    }

    // User
    if (loadingApprovedSchedules) {
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

    // Requisito 11 - caso não tenha feito solicitações ainda
    if (approvedSchedules.length === 0) {
        const contractDateToPermitUse = dayjs(userData.contractDate).add(
            12,
            'month'
        )

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

    // TODO: Refatorar

    // Requisito 11
    if (approvedSchedules.length > 0) {
        // acha a férias aprovada com a data mais recente dentro do array approvedSchedules e depois o início e fim das férias com a data atual para saber se o funcionário está de férias ou não

        const lastApprovedSchedule = approvedSchedules.reduce((prev, current) =>
            prev.createdAt > current.createdAt ? prev : current
        )

        if (userData.id) {
            if (
                dayjs(lastApprovedSchedule.start).isSame(dayjs()) ||
                (dayjs().isAfter(dayjs(lastApprovedSchedule.start)) &&
                    dayjs().isBefore(dayjs(lastApprovedSchedule.end)))
            ) {
                ;(async function () {
                    await api.patch(
                        `/employees/${userData.id}`,
                        {
                            vacationStatus: true,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                })()
            } else {
                ;(async function () {
                    const response = await api.patch(
                        `/employees/${userData.id}`,
                        {
                            vacationStatus: false,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )

                    console.log(response.data)
                })()
            }
        }

        const lastApprovedScheduleEndDate = dayjs(lastApprovedSchedule.end)

        // Verificar se o último período de férias aprovado está dentro do período aquisitivo atual e se o período aquisitivo atual está prestes de vencer
        const periodoAquisitivo = dayjs(userData.contractDate).set(
            'year',
            dayjs(new Date()).year()
        )

        if (lastApprovedScheduleEndDate.isBefore(periodoAquisitivo)) {
            if (
                dayjs().isAfter(periodoAquisitivo.add(11, 'month')) &&
                dayjs().isBefore(periodoAquisitivo.add(12, 'month'))
            ) {
                // TODO: Enviar email para o gestor e para o funcionário
                ;(async function () {
                    if (userData.idManager) {
                        try {
                            // Enviando para o gestor
                            await emailApi.post('/enviar_mensagem', {
                                email: {
                                    destinatario: 'guisilveira.cout@gmail.com',
                                    assunto:
                                        'Você está prestes a acumular período de férias!',
                                    mensagem:
                                        'Você está prestes a acumular período de férias!',
                                },
                                msgWorkplace: {
                                    id: 100089487301073,
                                    mensagem:
                                        'Você está prestes a acumular período de férias!',
                                },
                            })
                            //Enviando para o funcionário
                        } catch (error) {
                            console.log(error)
                        }
                    }
                })()
                // TODO: não permitir que vença o período
            }
        }
    }

    return <h1>Home</h1>
}

export default Home
