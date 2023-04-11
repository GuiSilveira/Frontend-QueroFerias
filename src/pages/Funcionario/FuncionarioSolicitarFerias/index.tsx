import {
    Alert,
    AlertColor,
    Box,
    CircularProgress,
    Container,
    Divider,
    MenuItem,
    Snackbar,
    Typography,
} from '@mui/material'
import { DateField } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { useState, useEffect } from 'react'
import DefaultButton from '../../../components/DefaultButton'
import DefaultCard from '../../../components/DefaultCard'
import DefaultSelect from '../../../components/DefaultSelect'
import DefaultTextArea from '../../../components/DefaultTextArea'
import DefaultTitle from '../../../components/DefaultTitle'
import SearchBar from '../../../components/SearchBar'
import api from '../../../services/api'
import { useUserDataStore } from '../../../store/useUserData'
import { ScheduleType } from '../../../types/types'
import { getAuthToken } from '../../../util/auth'
import axios from 'axios'

const FuncionarioSolicitarFerias = () => {
    const { id, idManager, contract, contractDate, name } = useUserDataStore(
        (state: any) => state.userData
    )
    const token = getAuthToken()
    const [diasFerias, setDiasFerias] = useState<string>('')
    const [anticipateSalary, setAnticipateSalary] = useState<string | null>(
        'nao'
    )
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(new Date()))
    const [endDate, setEndDate] = useState<Dayjs | null>(
        dayjs(new Date()).add(5, 'day')
    )
    const [mensagemFuncionario, setMensagemFuncionario] = useState<
        string | null
    >(null)
    const [managers, setManagers] = useState<any>([])
    const [pendingSchedule, setPendingSchedule] = useState<ScheduleType[]>([])
    const [disableButton, setDisableButton] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingApprovedSchedules, setLoadingApprovedSchedules] =
        useState<boolean>(false)
    const [loadingManager, setLoadingManager] = useState<boolean>(false)
    const [daysRemaining, setDaysRemaining] = useState<number>(30)
    const periodoAquisitivo = dayjs(contractDate).year(dayjs().year())
    const periodoAquisitivoFinal = dayjs(periodoAquisitivo).add(1, 'year')
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [snackbarMessage, setSnackbarMessage] = useState<string>('')
    const [snackbarSeverity, setSnackbarSeverity] =
        useState<AlertColor>('success')

    const handleClose = () => {
        setOpenSnackbar(false)
    }

    useEffect(() => {
        if (!idManager) {
            ;(async () => {
                setLoadingManager(true)
                const response = await api.get('/employees/managers', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                setManagers(response.data)
                setLoadingManager(false)
            })()
        }
    }, [idManager])

    useEffect(() => {
        if (id) {
            ;(async () => {
                setLoading(true)
                const { data } = await api.get(
                    `/employees/${id}/schedules/pending`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                setPendingSchedule(data)
                setLoading(false)
            })()
        }
    }, [id])

    // Funcionários férias aprovadas no período aquisitivo atual
    useEffect(() => {
        if (id) {
            ;(async () => {
                setLoadingApprovedSchedules(true)
                const { data } = await api.get(`/employees/${id}/schedules`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                const approvedSchedules = data.filter(
                    (schedule: ScheduleType) => schedule.status === 'Approved'
                )

                const approvedSchedulesInCurrentPeriod =
                    approvedSchedules.filter((schedule: ScheduleType) => {
                        const scheduleStartDate = dayjs(schedule.start)
                        const scheduleEndDate = dayjs(schedule.end)

                        return (
                            (scheduleStartDate.isSame(periodoAquisitivo) ||
                                scheduleStartDate.isAfter(periodoAquisitivo)) &&
                            scheduleEndDate.isBefore(periodoAquisitivoFinal)
                        )
                    })

                const daysApproved = approvedSchedulesInCurrentPeriod.reduce(
                    (acc: number, schedule: ScheduleType) => {
                        const scheduleStartDate = dayjs(schedule.start)
                        const scheduleEndDate = dayjs(schedule.end)

                        const days = scheduleEndDate.diff(
                            scheduleStartDate,
                            'day'
                        )

                        return acc + days
                    },
                    0
                )

                setDaysRemaining(30 - daysApproved)
                setLoadingApprovedSchedules(false)
            })()
        }
    }, [id])

    if (loading || loadingApprovedSchedules || loadingManager || !id) {
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

    if (contractDate) {
        const today = dayjs(Date.now()).toISOString()
        const contractDateAYearLater = dayjs(contractDate)
            .add(1, 'year')
            .toISOString()

        if (today < contractDateAYearLater) {
            return (
                <DefaultTitle
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    Você ainda não pode solicitar as suas férias.
                </DefaultTitle>
            )
        }
    }

    return (
        <>
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
                <Box>
                    {pendingSchedule.length > 0 ? (
                        <DefaultTitle
                            sx={{
                                marginTop: '71px',
                                marginBottom: '5px',
                                alignSelf: 'flex-start',
                            }}
                        >
                            Você já possui um agendamento pendente. Não é
                            possível fazer mais agendamentos.
                        </DefaultTitle>
                    ) : (
                        <>
                            <DefaultTitle
                                sx={{
                                    marginTop: '71px',
                                    marginBottom: '5px',
                                    alignSelf: 'flex-start',
                                }}
                            >
                                {idManager
                                    ? 'Solicitar Férias'
                                    : 'Ops, parece que você não tem gerente associado a sua conta. Selecione o seu gerente na lista abaixo:'}
                            </DefaultTitle>
                            {idManager ? (
                                <>
                                    <Box
                                        sx={{
                                            marginBottom: '1rem',
                                        }}
                                    >
                                        <DefaultCard
                                            width={{
                                                xs: 'calc(100vw - 2rem)',
                                                md: '300px',
                                                lg: '100%',
                                            }}
                                        >
                                            <Typography
                                                fontWeight="medium"
                                                color="grey.500"
                                            >
                                                Dias de férias disponíveis
                                            </Typography>
                                            <Divider />
                                            <Typography marginTop="5px">
                                                Você possui
                                            </Typography>
                                            <Typography
                                                color="primary.main"
                                                fontWeight="bold"
                                                fontSize="50px"
                                            >
                                                {daysRemaining}
                                            </Typography>
                                            <Typography>
                                                dias de férias disponíveis no
                                                período aquisitivo atual que vai
                                                de
                                                {` ${periodoAquisitivo.format(
                                                    'DD/MM/YYYY'
                                                )} a ${periodoAquisitivoFinal.format(
                                                    'DD/MM/YYYY'
                                                )}`}
                                            </Typography>
                                        </DefaultCard>
                                    </Box>
                                    <DefaultCard
                                        minWidth={{
                                            xs: 'calc(100vw - 2rem)',
                                            md: '600px',
                                        }}
                                        maxWidth={{
                                            xs: 'calc(100vw - 2rem)',
                                            md: '500px',
                                        }}
                                    >
                                        <DefaultSelect
                                            value={String(diasFerias)}
                                            onChange={(event) =>
                                                setDiasFerias(
                                                    event.target.value
                                                )
                                            }
                                            name="diasFerias"
                                            label={'Dias de Férias'}
                                            labelId={'diasFerias'}
                                        >
                                            <MenuItem key="5" value="5">
                                                5
                                            </MenuItem>
                                            <MenuItem key="10" value="10">
                                                10
                                            </MenuItem>
                                            <MenuItem key="15" value="15">
                                                15
                                            </MenuItem>
                                            <MenuItem key="20" value="20">
                                                20
                                            </MenuItem>
                                            <MenuItem key="30" value="30">
                                                30
                                            </MenuItem>
                                        </DefaultSelect>
                                        <DateField
                                            value={startDate}
                                            onChange={(newValue) =>
                                                setStartDate(newValue)
                                            }
                                            name="start"
                                            label="Data de Início"
                                            format="DD-MM-YYYY"
                                            sx={{
                                                width: '100%',
                                                margin: '20px 0',
                                            }}
                                        />
                                        <DateField
                                            value={endDate}
                                            onChange={(newValue) =>
                                                setEndDate(newValue)
                                            }
                                            name="end"
                                            label="Data de Término"
                                            format="DD-MM-YYYY"
                                            sx={{
                                                width: '100%',
                                            }}
                                        />
                                        {contract === 'CLT' ? (
                                            <DefaultSelect
                                                value={
                                                    anticipateSalary
                                                        ? anticipateSalary
                                                        : ''
                                                }
                                                onChange={(event) =>
                                                    setAnticipateSalary(
                                                        event.target.value
                                                    )
                                                }
                                                name="antecipateSalary"
                                                label={'Antecipar 13º?'}
                                                labelId={'antecipacaoDecimo'}
                                            >
                                                <MenuItem key="sim" value="sim">
                                                    Sim
                                                </MenuItem>
                                                <MenuItem key="nao" value="nao">
                                                    Não
                                                </MenuItem>
                                            </DefaultSelect>
                                        ) : (
                                            <></>
                                        )}
                                        <DefaultTextArea
                                            name="mensagem"
                                            value={
                                                mensagemFuncionario
                                                    ? mensagemFuncionario
                                                    : ''
                                            }
                                            onChange={(event) => {
                                                setMensagemFuncionario(
                                                    event.target.value
                                                )
                                            }}
                                        />
                                        <DefaultButton
                                            disable={disableButton}
                                            content={'Solicitar Férias'}
                                            type="submit"
                                            onClick={async () => {
                                                try {
                                                    const response =
                                                        await api.post(
                                                            '/schedules',
                                                            {
                                                                idEmployee:
                                                                    String(id),
                                                                start: dayjs(
                                                                    startDate?.format(
                                                                        'YYYY-MM-DD'
                                                                    )
                                                                ),
                                                                end: dayjs(
                                                                    endDate?.format(
                                                                        'YYYY-MM-DD'
                                                                    )
                                                                ),
                                                                anticipateSalary:
                                                                    anticipateSalary ===
                                                                    'sim'
                                                                        ? true
                                                                        : false,
                                                                employeeComment:
                                                                    mensagemFuncionario
                                                                        ? mensagemFuncionario
                                                                        : '',
                                                                vacationDays:
                                                                    diasFerias,
                                                                employeeContractDate:
                                                                    contractDate.slice(
                                                                        0,
                                                                        10
                                                                    ),
                                                            }
                                                        )

                                                    setOpenSnackbar(true)
                                                    setSnackbarMessage(
                                                        'Solicitação de férias enviada com sucesso!'
                                                    )
                                                    setSnackbarSeverity(
                                                        'success'
                                                    )

                                                    if (response.data) {
                                                        setDisableButton(true)
                                                        const response =
                                                            await axios.post(
                                                                'http://localhost:8000/enviar_mensagem',
                                                                {
                                                                    email: {
                                                                        assunto: `Solicitação de Férias de ${name}`,
                                                                        mensagem: `Olá, você recebeu uma solicitação de férias de ${name}.
                                                                        Data de início: ${startDate}
                                                                        Data de término: ${endDate}
                                                                        Dias de férias: ${diasFerias}
                                                                        Mensagem do funcionário: ${mensagemFuncionario}
                                                                        `,
                                                                        destinatario:
                                                                            'guisilveira.cout@gmail.com',
                                                                    },
                                                                    msgWorkplace:
                                                                        {
                                                                            id: 100089487301073,
                                                                            mensagem: `Nova Solicitação de Férias de ${name}`,
                                                                        },
                                                                }
                                                            )
                                                    }
                                                } catch (error: any) {
                                                    setOpenSnackbar(true)
                                                    setSnackbarMessage(
                                                        'Erro ao enviar solicitação de férias'
                                                    )
                                                    setSnackbarSeverity('error')
                                                }
                                            }}
                                        />
                                    </DefaultCard>
                                </>
                            ) : (
                                <SearchBar
                                    data={managers}
                                    idEmployee={id}
                                    token={token}
                                    isManager={false}
                                />
                            )}
                        </>
                    )}
                </Box>
            </Container>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleClose}
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

export default FuncionarioSolicitarFerias
