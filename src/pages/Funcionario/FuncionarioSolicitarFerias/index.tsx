import { Box, CircularProgress, Container, MenuItem } from '@mui/material'
import { DateField } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { useState, useEffect } from 'react'
import { Form } from 'react-router-dom'
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
    const [anticipateSalary, setAnticipateSalary] = useState<string | null>('')
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(new Date()))
    const [endDate, setEndDate] = useState<Dayjs | null>(
        dayjs(new Date()).add(5, 'day')
    )
    const [mensagemFuncionario, setMensagemFuncionario] = useState<
        string | null
    >(null)
    const [managers, setManagers] = useState<any>([])
    const [employeeManager, setEmployeeManager] = useState<any | null>(null)
    const [pendingSchedule, setPendingSchedule] = useState<ScheduleType[]>([])
    const [disableButton, setDisableButton] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    console.log(employeeManager)
    useEffect(() => {
        if (!idManager) {
            ;(async () => {
                const response = await api.get('/employees/managers', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                setManagers(response.data)
            })()
        } else {
            ;(async () => {
                const response = await api.get(`/employees/${idManager}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                setEmployeeManager(response.data)
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

    if (loading || !id) {
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
                        Você já possui um agendamento pendente. Não é possível
                        fazer mais agendamentos.
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
                                    <Form>
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
                                            format="YYYY-MM-DD"
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
                                            format="YYYY-MM-DD"
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
                                                // TODO: Try catch aqui para tratar errors
                                                const { data } = await api.post(
                                                    '/schedules',
                                                    {
                                                        idEmployee: String(id),
                                                        start: startDate,
                                                        end: endDate,
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

                                                if (data) {
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
                                                                msgWorkplace: {
                                                                    id: 100089487301073,
                                                                    mensagem: `Nova Solicitação de Férias de ${name}`,
                                                                },
                                                            }
                                                        )
                                                }
                                            }}
                                        />
                                    </Form>
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
    )
}

export default FuncionarioSolicitarFerias
