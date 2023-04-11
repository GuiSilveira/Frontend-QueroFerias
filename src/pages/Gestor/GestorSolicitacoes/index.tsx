import {
    Alert,
    AlertColor,
    Box,
    CircularProgress,
    Container,
    List,
    SelectChangeEvent,
    Snackbar,
    Typography,
} from '@mui/material'
import CardBoldTitle from '../../../components/CardBoldTitle'
import DefaultFilter from '../../../components/DefaultFilter'
import DefaultTitle from '../../../components/DefaultTitle'
import { useEffect, useState } from 'react'
import DefaultModal from '../../../components/DefaultModal'
import DefaultTextArea from '../../../components/DefaultTextArea'
import { getAuthToken } from '../../../util/auth'
import api from '../../../services/api'
import Solicitacao from './Solicitacao'
import { EmployeeScheduleType, UserLoaderDataType } from '../../../types/types'
import { useRouteLoaderData } from 'react-router-dom'
import axios from 'axios'

const GestorSolicitacoes = () => {
    const [open, setOpen] = useState(false)
    const token = getAuthToken()
    const [mensagemGestor, setMensagemGestor] = useState<string | null>(null)
    const [filter, setFilter] = useState<string>('Todas')
    const [employeesWithSchedules, setEmployeesWithSchedules] = useState<
        EmployeeScheduleType[]
    >([])
    const [selectedSchedule, setSelectedSchedule] = useState<any>()
    const verifiedTokenData = useRouteLoaderData(
        'rootHome'
    ) as UserLoaderDataType
    const data = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') as string)
        : verifiedTokenData.id
    const [loading, setLoading] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [snackbarMessage, setSnackbarMessage] = useState<string>('')
    const [snackbarSeverity, setSnackbarSeverity] =
        useState<AlertColor>('success')

    const handleOpen = (schedule: any) => {
        setSelectedSchedule(schedule)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
    }

    useEffect(() => {
        if (data.id) {
            setLoading(true)
            ;(async () => {
                const response = await api.get(
                    `/employees/manager/${data.id}/schedules/all`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                const filteredEmployeeSchedules = response.data.filter(
                    (employee: any) => {
                        return employee.schedules.length > 0
                    }
                )
                setEmployeesWithSchedules(filteredEmployeeSchedules)
                setLoading(false)
            })()
        }
    }, [])

    if (loading) {
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
        <>
            <Box>
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
                    <DefaultTitle>Solicitações</DefaultTitle>
                    <DefaultFilter
                        value={filter}
                        onChange={(event: SelectChangeEvent) => {
                            setFilter(event.target.value as string)
                        }}
                    />
                    <List
                        sx={{
                            display: 'flex',
                            flexDirection: {
                                xs: 'column',
                                md: 'row',
                            },
                            gap: '1rem',
                            flexWrap: 'wrap',
                            paddingRight: '1rem',
                            paddingBottom: '1rem',
                            width: '100%',
                        }}
                    >
                        {employeesWithSchedules.map((employee: any) => {
                            return employee.schedules.map((schedule: any) => {
                                if (filter === 'Todas') {
                                    return (
                                        <Solicitacao
                                            employeesWithSchedule={
                                                employeesWithSchedules
                                            }
                                            setEmployeesWithSchedule={
                                                setEmployeesWithSchedules
                                            }
                                            key={schedule.id}
                                            schedule={schedule}
                                            employee={employee}
                                            handleOpen={() => {
                                                handleOpen({
                                                    id: schedule.id,
                                                    employeeId: employee.id,
                                                    employeeName: employee.name,
                                                    startDate:
                                                        schedule.start.slice(
                                                            0,
                                                            10
                                                        ),
                                                    endDate: schedule.end.slice(
                                                        0,
                                                        10
                                                    ),
                                                    employeeComment:
                                                        schedule.employeeComment,
                                                })
                                            }}
                                        />
                                    )
                                } else if (filter === 'Aprovadas') {
                                    return (
                                        schedule.status === 'Approved' && (
                                            <Solicitacao
                                                employeesWithSchedule={
                                                    employeesWithSchedules
                                                }
                                                setEmployeesWithSchedule={
                                                    setEmployeesWithSchedules
                                                }
                                                key={schedule.id}
                                                schedule={schedule}
                                                employee={employee}
                                                handleOpen={() => {
                                                    handleOpen({
                                                        id: schedule.id,
                                                        employeeId: employee.id,
                                                        employeeName:
                                                            employee.name,
                                                        startDate:
                                                            schedule.start.slice(
                                                                0,
                                                                10
                                                            ),
                                                        endDate:
                                                            schedule.end.slice(
                                                                0,
                                                                10
                                                            ),
                                                        employeeComment:
                                                            schedule.employeeComment,
                                                    })
                                                }}
                                            />
                                        )
                                    )
                                } else if (filter === 'Reprovadas') {
                                    return (
                                        schedule.status === 'Rejected' && (
                                            <Solicitacao
                                                employeesWithSchedule={
                                                    employeesWithSchedules
                                                }
                                                setEmployeesWithSchedule={
                                                    setEmployeesWithSchedules
                                                }
                                                key={schedule.id}
                                                schedule={schedule}
                                                employee={employee}
                                                handleOpen={() => {
                                                    handleOpen({
                                                        id: schedule.id,
                                                        employeeId: employee.id,
                                                        employeeName:
                                                            employee.name,
                                                        startDate:
                                                            schedule.start.slice(
                                                                0,
                                                                10
                                                            ),
                                                        endDate:
                                                            schedule.end.slice(
                                                                0,
                                                                10
                                                            ),
                                                        employeeComment:
                                                            schedule.employeeComment,
                                                    })
                                                }}
                                            />
                                        )
                                    )
                                } else if (filter === 'Pendentes') {
                                    return (
                                        schedule.status === 'Pending' && (
                                            <Solicitacao
                                                employeesWithSchedule={
                                                    employeesWithSchedules
                                                }
                                                setEmployeesWithSchedule={
                                                    setEmployeesWithSchedules
                                                }
                                                key={schedule.id}
                                                schedule={schedule}
                                                employee={employee}
                                                handleOpen={() => {
                                                    handleOpen({
                                                        id: schedule.id,
                                                        employeeId: employee.id,
                                                        employeeName:
                                                            employee.name,
                                                        startDate:
                                                            schedule.start.slice(
                                                                0,
                                                                10
                                                            ),
                                                        endDate:
                                                            schedule.end.slice(
                                                                0,
                                                                10
                                                            ),
                                                        employeeComment:
                                                            schedule.employeeComment,
                                                    })
                                                }}
                                            />
                                        )
                                    )
                                }
                            })
                        })}
                    </List>
                    <DefaultModal
                        isOpen={open}
                        closeModal={handleClose}
                        handleApproval={async () => {
                            try {
                                if (selectedSchedule) {
                                    const response = await api.patch(
                                        `/schedules/${selectedSchedule.id}`,
                                        {
                                            status: 'Rejected',
                                            managerComment: mensagemGestor
                                                ? mensagemGestor
                                                : '',
                                        }
                                    )

                                    if (response.status === 200) {
                                        const emailResponse = await axios.post(
                                            'http://localhost:8000/enviar_mensagem',
                                            {
                                                email: {
                                                    assunto: `Reprovação de férias`,
                                                    mensagem: `Olá, seu gestor reprovou suas férias de ${selectedSchedule.startDate.slice(
                                                        0,
                                                        10
                                                    )} até ${selectedSchedule.endDate.slice(
                                                        0,
                                                        10
                                                    )} por conta de: ${
                                                        mensagemGestor
                                                            ? mensagemGestor
                                                            : 'Não informado'
                                                    }`,
                                                    destinatario:
                                                        'guisilveira.cout@gmail.com',
                                                },
                                                msgWorkplace: {
                                                    id: 100089487301073,
                                                    mensagem: `Aprovação de férias! Olá, seu gestor reprovou suas férias de ${selectedSchedule.startDate.slice(
                                                        0,
                                                        10
                                                    )} até ${selectedSchedule.endDate.slice(
                                                        0,
                                                        10
                                                    )}`,
                                                },
                                            }
                                        )
                                    }

                                    const newEmployeesWithSchedule =
                                        employeesWithSchedules.map(
                                            (employee) => {
                                                if (
                                                    employee.id ===
                                                    selectedSchedule.idEmployee
                                                ) {
                                                    employee.schedules.map(
                                                        (employeeSchedule) => {
                                                            if (
                                                                selectedSchedule.id ===
                                                                employeeSchedule.id
                                                            ) {
                                                                employeeSchedule.status =
                                                                    'Rejected'
                                                            }

                                                            return employeeSchedule
                                                        }
                                                    )
                                                }

                                                return employee
                                            }
                                        )

                                    setEmployeesWithSchedules(
                                        newEmployeesWithSchedule
                                    )
                                    setMensagemGestor('')
                                    setOpenSnackbar(true)
                                    setSnackbarMessage(
                                        'Férias do funcionário reprovadas com sucesso!'
                                    )
                                    setSnackbarSeverity('success')
                                    handleClose()
                                }
                            } catch (error) {
                                setOpenSnackbar(true)
                                setSnackbarMessage(
                                    'Erro ao rejeitar férias do funcionário!'
                                )
                                setSnackbarSeverity('error')
                                return error
                            }
                        }}
                        approveText={'Enviar'}
                        rejectText={'Cancelar'}
                    >
                        <Box marginBottom="1rem">
                            <CardBoldTitle>Dados da Solicitação</CardBoldTitle>
                            <CardBoldTitle>Nome</CardBoldTitle>
                            <Typography>
                                {selectedSchedule?.employeeName}
                            </Typography>
                            <CardBoldTitle>Férias</CardBoldTitle>
                            <Typography>
                                De {selectedSchedule?.startDate} até{' '}
                                {selectedSchedule?.endDate}
                            </Typography>
                            <CardBoldTitle>Mensagem</CardBoldTitle>
                            <Typography>
                                {selectedSchedule?.employeeComment
                                    ? selectedSchedule?.employeeComment
                                    : 'Sem mensagem'}
                            </Typography>
                        </Box>
                        <Box marginBottom="1rem">
                            <CardBoldTitle>
                                Informe o motivo da recusa
                            </CardBoldTitle>
                            <DefaultTextArea
                                name="mensagemGestor"
                                value={mensagemGestor ? mensagemGestor : ''}
                                onChange={(event) => {
                                    setMensagemGestor(event?.target.value)
                                }}
                            />
                        </Box>
                    </DefaultModal>
                </Container>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                sx={{
                    position: 'absolute',
                    top: '80%',
                    zIndex: 9999,
                }}
            >
                <Alert
                    onClose={handleClose}
                    severity={snackbarSeverity}
                    sx={{
                        width: '100%',
                        border: `1px solid ${
                            snackbarSeverity === 'success'
                                ? '#27AE60'
                                : '#FF5252'
                        }`,
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default GestorSolicitacoes
