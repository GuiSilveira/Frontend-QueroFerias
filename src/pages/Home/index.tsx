import * as dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate, useRouteLoaderData } from 'react-router-dom'
import DefaultTitle from '../../components/DefaultTitle'
import api, { emailApi } from '../../services/api'
import { useUserDataStore } from '../../store/useUserData'
import { ScheduleType, UserLoaderDataType } from '../../types/types'
import { getAuthToken } from '../../util/auth'
import {
    Box,
    CircularProgress,
    Container,
    Stack,
    Typography,
} from '@mui/material'
import DefaultModal from '../../components/DefaultModal'
import axios from 'axios'
import DefaultContainer from '../../components/DefaultContainer'
import DefaultCard from '../../components/DefaultCard'
import DefaultButton from '../../components/DefaultButton'

const Home = () => {
    const token = getAuthToken()
    const userData = useUserDataStore((state: any) => state.userData)
    const verifiedTokenData = useRouteLoaderData(
        'rootHome'
    ) as UserLoaderDataType
    const data = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') as string)
        : verifiedTokenData.id
    const [searchedUserData, setSearchedUserData] = useState<any>()
    const [approvedSchedules, setApprovedSchedules] = useState<ScheduleType[]>(
        []
    )
    const [employeesApprovedSchedules, setEmployeesApprovedSchedules] =
        useState<ScheduleType[]>([])
    const [managerEmployees, setManagerEmployees] = useState<any[]>([])
    const [detailedApprovedSchedules, setDetailedApprovedSchedules] = useState<
        any[]
    >([])
    const [loadingApprovedSchedules, setLoadingApprovedSchedules] =
        useState(false)
    const [
        loadingDetailedApprovedSchedules,
        setLoadingDetailedApprovedSchedules,
    ] = useState(false)
    const [
        loadingEmployeeApprovedSchedules,
        setLoadingEmployeeApprovedSchedules,
    ] = useState(false)
    const [loadingManagerEmployees, setLoadingManagerEmployees] =
        useState(false)
    const [loadingSearchedUserData, setLoadingSearchedUserData] =
        useState(false)
    const [openModal, setOpenModal] = useState(false)
    const navigate = useNavigate()

    const handleClose = () => setOpenModal(false)

    useEffect(() => {
        ;(async () => {
            setLoadingApprovedSchedules(true)
            const response = await api.get(`/schedules/employee/${data.id}`)

            setApprovedSchedules(response.data)
            setLoadingApprovedSchedules(false)
        })()
    }, [])

    useEffect(() => {
        if (!userData) return
        ;(async () => {
            setLoadingSearchedUserData(true)
            const response = await api.get(`/employees/${data.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.data.vacationStatus === 'Delayed') {
                setOpenModal(true)
            }
            setSearchedUserData(response.data)
            setLoadingSearchedUserData(false)
        })()

        return () => {}
    }, [])

    useEffect(() => {
        if (!data.position) return

        if (data.position === 'Manager') {
            ;(async () => {
                setLoadingDetailedApprovedSchedules(true)
                const response = await api.get(
                    `/employees/manager/${data.id}/schedules/Approved`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                setDetailedApprovedSchedules(response.data)

                setLoadingDetailedApprovedSchedules(false)
            })()
        }
        return () => {}
    }, [])

    useEffect(() => {
        if (!data.position) return

        if (data.position === 'Manager') {
            setLoadingEmployeeApprovedSchedules(true)
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
                setLoadingEmployeeApprovedSchedules(false)
            })()
        }
    }, [])

    useEffect(() => {
        if (!data.position) return

        if (data.position === 'Manager') {
            setLoadingManagerEmployees(true)
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
                setLoadingManagerEmployees(false)
            })()
        }
    }, [])

    if (
        loadingApprovedSchedules ||
        loadingDetailedApprovedSchedules ||
        loadingEmployeeApprovedSchedules ||
        loadingManagerEmployees ||
        loadingSearchedUserData
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

    // Pegar a data de contratação do usuário e somar 12 meses, verificar se houve alguma solicitação de férias aprovada no período do início do período aquisito até 11 meses depois. Se não houver, alterar o vacationStatus para 'atrasado'
    if (detailedApprovedSchedules.length > 0) {
        detailedApprovedSchedules.map((employee) => {
            const contractDate = dayjs(employee.contractDate)
            const anoAtual = dayjs().year()
            const periodoAquisitivoInicio = contractDate.year(anoAtual)
            const periodoAquisitivoFim = periodoAquisitivoInicio.add(
                12,
                'month'
            )
            const periodoDePendencia = periodoAquisitivoFim.subtract(1, 'month')

            let naoPossuiFeriasAprovadasNoPeriodo = true

            employee.schedules.forEach((schedule: ScheduleType) => {
                if (
                    dayjs(schedule.start).isAfter(periodoAquisitivoInicio) &&
                    dayjs(schedule.end).isBefore(periodoAquisitivoFim)
                ) {
                    naoPossuiFeriasAprovadasNoPeriodo = false
                }
            })

            if (
                naoPossuiFeriasAprovadasNoPeriodo &&
                (dayjs().isSame(periodoDePendencia) ||
                    (dayjs().isAfter(periodoDePendencia) &&
                        dayjs().isBefore(periodoAquisitivoFim)))
            ) {
                ;(async function () {
                    await api.patch(
                        `/employees/${employee.id}`,
                        {
                            vacationStatus: 'Delayed',
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                })()
                ;(async function () {
                    await axios.post(`http://127.0.0.1:8000/enviar_mensagem`, {
                        email: {
                            assunto: `Atraso nas férias!`,
                            mensagem: `Olá, você precisa tirar férias, pois as suas estão atrasadas! Não deixe com que suas férias vençam, tire suas férias imediatamente e saia do atraso!`,
                            destinatario: 'guisilveira.cout@gmail.com',
                        },
                        msgWorkplace: {
                            id: 100089487301073,
                            mensagem:
                                'Não deixe com que suas férias vençam, tire suas férias imediatamente e saia do atraso!',
                        },
                    })

                    await axios.post(`http://127.0.0.1:8000/enviar_mensagem`, {
                        email: {
                            assunto: `Atraso nas férias!`,
                            mensagem: `Seu funcionário ${employee.name} precisa tirar férias, pois estão atrasadas! Não deixe com que as férias vençam!`,
                            destinatario: 'guisilveira.cout@gmail.com',
                        },
                        msgWorkplace: {
                            id: 100089487301073,
                            mensagem: `Não deixe com que as férias do seu funcionário ${employee.name} vençam! Ele precisa sair do atraso!`,
                        },
                    })
                })()
            }
        })
    }

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
                            vacationStatus: 'Vacation',
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
                        if (employee.vacationStatus === 'Vacation') {
                            await api.patch(
                                `/employees/${schedule.idEmployee}`,
                                {
                                    vacationStatus: 'Working',
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

    // UserColaborador

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
                dayjs().isSame(
                    dayjs(contractDateToPermitUse)
                        .add(11, 'month')
                        .year(dayjs().year())
                ) ||
                (dayjs().isAfter(
                    contractDateToPermitUse
                        .add(11, 'month')
                        .year(dayjs().year())
                ) &&
                    dayjs().isBefore(
                        contractDateToPermitUse
                            .add(12, 'month')
                            .year(dayjs().year())
                    ))
            ) {
                //Você está prestes a acumular período de férias!
                setOpenModal(true)
                ;(async function () {
                    await axios.post(`http://127.0.0.1:8000/enviar_mensagem`, {
                        email: {
                            assunto: `Atraso nas férias!`,
                            mensagem: `Olá, você precisa tirar férias, pois as suas estão atrasadas! Não deixe com que suas férias vençam, tire suas férias imediatamente e saia do atraso!`,
                            destinatario: 'guisilveira.cout@gmail.com',
                        },
                        msgWorkplace: {
                            id: 100089487301073,
                            mensagem:
                                'Não deixe com que suas férias vençam, tire suas férias imediatamente e saia do atraso!',
                        },
                    })

                    await axios.post(`http://127.0.0.1:8000/enviar_mensagem`, {
                        email: {
                            assunto: `Atraso nas férias!`,
                            mensagem: `Seu funcionário ${userData.name} precisa tirar férias, pois estão atrasadas! Não deixe com que as férias vençam!`,
                            destinatario: 'guisilveira.cout@gmail.com',
                        },
                        msgWorkplace: {
                            id: 100089487301073,
                            mensagem: `Não deixe com que as férias do seu funcionário ${userData.name} vençam! Ele precisa sair do atraso!`,
                        },
                    })
                })()
                ;(async function () {
                    await api.patch(
                        `/employees/${data.id}`,
                        {
                            vacationStatus: 'Delayed',
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                })()
            }
        }
    }

    // Requisito 11
    if (approvedSchedules.length > 0) {
        // acha a férias aprovada com a data mais recente dentro do array approvedSchedules e depois o início e fim das férias com a data atual para saber se o funcionário está de férias ou não

        const lastApprovedSchedule = approvedSchedules.reduce((prev, current) =>
            prev.createdAt > current.createdAt ? prev : current
        )

        if (data.id) {
            if (
                dayjs(lastApprovedSchedule.start).isSame(dayjs()) ||
                (dayjs().isAfter(dayjs(lastApprovedSchedule.start)) &&
                    dayjs().isBefore(dayjs(lastApprovedSchedule.end)))
            ) {
                ;(async function () {
                    await api.patch(
                        `/employees/${data.id}`,
                        {
                            vacationStatus: 'Vacation',
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
                        `/employees/${data.id}`,
                        {
                            vacationStatus: 'Working',
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
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
                dayjs().isSame(periodoAquisitivo.add(11, 'month')) ||
                (dayjs().isAfter(periodoAquisitivo.add(11, 'month')) &&
                    dayjs().isBefore(periodoAquisitivo.add(12, 'month')))
            ) {
                //Você está prestes a acumular período de férias!
                setOpenModal(true)
                ;(async function () {
                    await axios.post(`http://127.0.0.1:8000/enviar_mensagem`, {
                        email: {
                            assunto: `Atraso nas férias!`,
                            mensagem: `Olá, você precisa tirar férias, pois as suas estão atrasadas! Não deixe com que suas férias vençam, tire suas férias imediatamente e saia do atraso!`,
                            destinatario: 'guisilveira.cout@gmail.com',
                        },
                        msgWorkplace: {
                            id: 100089487301073,
                            mensagem:
                                'Não deixe com que suas férias vençam, tire suas férias imediatamente e saia do atraso!',
                        },
                    })

                    await axios.post(`http://127.0.0.1:8000/enviar_mensagem`, {
                        email: {
                            assunto: `Atraso nas férias!`,
                            mensagem: `Seu funcionário ${userData.name} precisa tirar férias, pois estão atrasadas! Não deixe com que as férias vençam!`,
                            destinatario: 'guisilveira.cout@gmail.com',
                        },
                        msgWorkplace: {
                            id: 100089487301073,
                            mensagem: `Não deixe com que as férias do seu funcionário ${userData.name} vençam! Ele precisa sair do atraso!`,
                        },
                    })
                })()
                ;(async function () {
                    await api.patch(
                        `/employees/${data.id}`,
                        {
                            vacationStatus: 'Delayed',
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                })()
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
                            return error
                        }
                    }
                })()
            }
        }
    }

    const actions = [
        { title: 'Solicitar Férias', url: '/home/solicitar' },
        { title: 'Todas as Solicitações', url: '/home/solicitacoes' },
        { title: 'Solicitações Gestor', url: '/home/gestor/solicitacoes' },
        { title: 'Time Gestor', url: '/home/gestor/time' },
        { title: 'Perfil', url: '/home/profile' },
        { title: 'Dashboard', url: '/home/gestor/dashboard' },
        { title: 'Registrar Funcionários', url: '/home/register' },
    ]

    return (
        <>
            <Container
                sx={{
                    marginTop: '5rem',
                    marginLeft: {
                        md: '240px',
                    },
                    marginBottom: {
                        xs: '2rem',
                        md: '0',
                    },
                }}
            >
                <DefaultTitle>{`Seja bem-vindo, ${userData.name}! Comece a navegar por aqui!`}</DefaultTitle>
                <Stack
                    gap={2}
                    marginTop={2}
                    flexDirection={{
                        xs: 'column',
                        md: 'row',
                    }}
                    maxWidth={{
                        sm: '75%',
                        md: 'none',
                    }}
                    marginX={{
                        sm: 'auto',
                        md: '0',
                    }}
                    flexWrap="wrap"
                >
                    {actions.map((action, index) => {
                        if (
                            userData.position !== 'Manager' &&
                            (action.title === 'Solicitações Gestor' ||
                                action.title === 'Time Gestor' ||
                                action.title === 'Dashboard')
                        )
                            return null

                        if (
                            userData.position !== 'Admin' &&
                            action.title === 'Registrar Funcionários'
                        ) {
                            return null
                        }

                        if (
                            userData.position === 'Admin' &&
                            action.title !== 'Registrar Funcionários'
                        ) {
                            return null
                        }

                        return (
                            <DefaultCard key={index}>
                                <DefaultTitle>{action.title}</DefaultTitle>
                                <DefaultButton
                                    content={`Visitar ${action.title}`}
                                    onClick={() => {
                                        navigate(action.url)
                                    }}
                                />
                            </DefaultCard>
                        )
                    })}
                </Stack>
            </Container>
            <DefaultModal
                isOpen={openModal}
                closeModal={handleClose}
                rejectText="Fechar"
                approveText="Ir até solicitações"
                handleApproval={() => {
                    navigate('/home/solicitar')
                }}
            >
                <Typography variant="h6" component="h2" paddingBottom="1rem">
                    Você está com período de férias atrasado! Faça a sua
                    solicitação!
                </Typography>
            </DefaultModal>
        </>
    )
}

export default Home
