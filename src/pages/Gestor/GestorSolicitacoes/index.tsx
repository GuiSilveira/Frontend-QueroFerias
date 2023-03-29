import {
    Box,
    Container,
    List,
    SelectChangeEvent,
    Typography,
} from '@mui/material'
import CardBoldTitle from '../../../components/CardBoldTitle'
import DefaultFilter from '../../../components/DefaultFilter'
import DefaultTitle from '../../../components/DefaultTitle'
import { useEffect, useState } from 'react'
import DefaultModal from '../../../components/DefaultModal'
import DefaultTextArea from '../../../components/DefaultTextArea'
import { useUserDataStore } from '../../../store/useUserData'
import { getAuthToken } from '../../../util/auth'
import api from '../../../services/api'
import Solicitacao from './Solicitacao'
import { EmployeeScheduleType } from '../../../types/types'

const GestorSolicitacoes = () => {
    const [open, setOpen] = useState(false)
    const token = getAuthToken()
    const [mensagemGestor, setMensagemGestor] = useState<string | null>(null)
    const [filter, setFilter] = useState<string>('Todas')
    const userData = useUserDataStore((state: any) => state.userData)
    const [employeesWithSchedules, setEmployeesWithSchedules] = useState<
        EmployeeScheduleType[]
    >([])
    const [selectedSchedule, setSelectedSchedule] = useState<any>()

    const handleOpen = (schedule: any) => {
        setSelectedSchedule(schedule)
        console.log(selectedSchedule)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (userData.id) {
            ;(async () => {
                const response = await api.get(
                    `/employees/manager/${userData.id}/schedules/all`,
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
            })()
        }
    }, [userData, setEmployeesWithSchedules])

    if (!userData.id) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <Typography variant="h4">Carregando...</Typography>
            </Box>
        )
    }

    return (
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
                                                startDate: schedule.start.slice(
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
                                )
                            }
                        })
                    })}
                </List>
                <DefaultModal
                    isOpen={open}
                    closeModal={handleClose}
                    handleApproval={async () => {
                        const response = await api.patch(
                            `/schedules/${selectedSchedule.id}`,
                            {
                                status: 'Rejected',
                            }
                        )

                        if (!response) {
                            throw new Error('Erro ao rejeitar')
                        }

                        const newEmployeesWithSchedule =
                            employeesWithSchedules.map((employee) => {
                                if (
                                    employee.id === selectedSchedule.idEmployee
                                ) {
                                    employee.schedules.map(
                                        (employeeSchedule) => {
                                            if (
                                                selectedSchedule.id ===
                                                employeeSchedule.id
                                            ) {
                                                employeeSchedule.status =
                                                    'Rejected'
                                                console.log(employeeSchedule)
                                            }

                                            return employeeSchedule
                                        }
                                    )
                                }

                                return employee
                            })

                        setEmployeesWithSchedules(newEmployeesWithSchedule)
                        setMensagemGestor('')
                        handleClose()
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
    )
}

export default GestorSolicitacoes
