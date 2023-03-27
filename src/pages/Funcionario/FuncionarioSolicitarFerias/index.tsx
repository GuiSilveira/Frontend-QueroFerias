import { Box, Container, List, ListItem, MenuItem } from '@mui/material'
import { DateField } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { ActionFunctionArgs, Form, useRouteLoaderData } from 'react-router-dom'
import DefaultButton from '../../../components/DefaultButton'
import DefaultCard from '../../../components/DefaultCard'
import DefaultSelect from '../../../components/DefaultSelect'
import DefaultTextArea from '../../../components/DefaultTextArea'
import DefaultTitle from '../../../components/DefaultTitle'
import SearchBar from '../../../components/SearchBar'
import api from '../../../services/api'
import { UserLoaderDataType } from '../../../types/types'
import { getAuthToken } from '../../../util/auth'

const FuncionarioSolicitarFerias = () => {
    const { id, manager, contract } = useRouteLoaderData(
        'rootHome'
    ) as UserLoaderDataType
    const token = getAuthToken()
    const [diasFerias, setDiasFerias] = useState<string>('')
    const [antecipateSalary, setAntecipateSalary] = useState<string>('')
    const [startDate, setStartDate] = useState<any>()
    const [managers, setManagers] = useState<any>([])

    useEffect(() => {
        if (!manager) {
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

    console.log(startDate)

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
                    {manager
                        ? 'Solicitar Férias'
                        : 'Ops, parece que você não tem gerente associado a sua conta. Selecione o seu gerente na lista abaixo:'}
                </DefaultTitle>
                {manager ? (
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
                            <Form method="post">
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
                                </DefaultSelect>
                                <DateField
                                    value={startDate}
                                    onChange={(newValue) =>
                                        setStartDate(newValue)
                                    }
                                    name="start"
                                    label="Data de Início"
                                    format="DD/MM/YYYY"
                                    sx={{
                                        width: '100%',
                                        margin: '20px 0',
                                    }}
                                />
                                <DateField
                                    value={startDate}
                                    name="end"
                                    label="Data de Término"
                                    format="DD/MM/YYYY"
                                    readOnly
                                    sx={{
                                        width: '100%',
                                    }}
                                />
                                {contract === 'CLT' ? (
                                    <DefaultSelect
                                        value={antecipateSalary}
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
                                <DefaultTextArea name="mensagem" />
                                <DefaultButton
                                    content={'Solicitar Férias'}
                                    type="submit"
                                />
                            </Form>
                        </DefaultCard>
                    </>
                ) : (
                    <SearchBar data={managers} idEmployee={id} token={token} />
                )}
            </Box>
        </Container>
    )
}

export default FuncionarioSolicitarFerias

export async function createScheduleAction({ request }: ActionFunctionArgs) {
    const data = await request.formData()

    console.log(data.get('start'))

    // TODO: Verificação da data de início e fim
    // TODO: Deixar o fim readonly e atualizar conforme os dias solicitados e o início
    // TODO: atualizar o tipo de start e end do banco para Date e não DateTime
    // TODO: Conectar com o banco
    // TODO: Fazer o cálculo de dias de férias restantes (30 dias disponíveis no começo) e se tem, ao menos, um período de 15 dias

    return null
}
