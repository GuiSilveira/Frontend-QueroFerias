import { Box, Container, MenuItem } from '@mui/material'
import { DateField } from '@mui/x-date-pickers'
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
import { getAuthToken } from '../../../util/auth'

const FuncionarioSolicitarFerias = () => {
    const { id, idManager, contract } = useUserDataStore(
        (state: any) => state.userData
    )
    const token = getAuthToken()
    const [diasFerias, setDiasFerias] = useState<string>('')
    const [antecipateSalary, setAntecipateSalary] = useState<string | null>('')
    const [startDate, setStartDate] = useState<any>()
    const [endDate, setEndDate] = useState<any>()
    const [mensagemFuncionario, setMensagemFuncionario] = useState<
        string | null
    >(null)
    const [managers, setManagers] = useState<any>([])

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
        }
    }, [])

    if (!id) {
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
                                        setDiasFerias(event.target.value)
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
                                            antecipateSalary
                                                ? antecipateSalary
                                                : ''
                                        }
                                        onChange={(event) =>
                                            setAntecipateSalary(
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
                                    content={'Solicitar Férias'}
                                    type="submit"
                                    onClick={async () => {
                                        console.log(mensagemFuncionario)
                                        const response = await api.post(
                                            '/schedules',
                                            {
                                                idEmployee: String(id),
                                                start: startDate,
                                                end: endDate,
                                                antecipateSalary:
                                                    antecipateSalary
                                                        ? antecipateSalary
                                                        : '',
                                                employeeComment:
                                                    mensagemFuncionario
                                                        ? mensagemFuncionario
                                                        : '',
                                            }
                                        )
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
            </Box>
        </Container>
    )
}

export default FuncionarioSolicitarFerias
