import {
    Box,
    CircularProgress,
    Container,
    SelectChangeEvent,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import CardBoldTitle from '../../../components/CardBoldTitle'
import CardBoldTitleWithStatus from '../../../components/CardBoldTitleWithStatus'
import DefaultButton from '../../../components/DefaultButton'
import DefaultCard from '../../../components/DefaultCard'
import DefaultFilter from '../../../components/DefaultFilter'
import DefaultModal from '../../../components/DefaultModal'
import DefaultTitle from '../../../components/DefaultTitle'
import api from '../../../services/api'
import { ScheduleType, UserLoaderDataType } from '../../../types/types'
import { getAuthToken } from '../../../util/auth'
import dayjs from 'dayjs'

const FuncionarioSolicitacoes = () => {
    const token = getAuthToken()
    const { id } = useRouteLoaderData('rootHome') as UserLoaderDataType
    const [open, setOpen] = useState(false)
    const [filter, setFilter] = useState<string>('Todas')
    const [solicitacoes, setSolicitacoes] = useState([])
    const [solicitacaoSelecionada, setSolicitacaoSelecionada] =
        useState<ScheduleType>()
    const [loading, setLoading] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            const response = await api.get(`/employees/${id}/schedules`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setSolicitacoes(response.data)
            setLoading(false)
        })()
    }, [])

    const filteredSolicitacoes = solicitacoes.filter((solicitacao: any) => {
        if (filter === 'Todas') {
            return solicitacao
        } else if (filter === 'Pendentes' && solicitacao.status === 'Pending') {
            return solicitacao
        } else if (
            filter === 'Aprovadas' &&
            solicitacao.status === 'Approved'
        ) {
            return solicitacao
        } else if (
            filter === 'Reprovadas' &&
            solicitacao.status === 'Rejected'
        ) {
            return solicitacao
        }
    })

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
            <Box
                sx={{
                    width: {
                        md: '100%',
                    },
                }}
            >
                <Box>
                    <DefaultTitle
                        sx={{
                            marginTop: '71px',
                            marginBottom: '5px',
                        }}
                    >
                        Suas Solicitações de Férias
                    </DefaultTitle>
                    <DefaultFilter
                        value={filter}
                        onChange={(event: SelectChangeEvent) =>
                            setFilter(event.target.value as string)
                        }
                    />
                </Box>
                <Box
                    component="ul"
                    sx={{
                        display: 'flex',
                        flexDirection: {
                            xs: 'column',
                            md: 'row',
                        },
                        flexWrap: {
                            md: 'wrap',
                        },
                        gap: {
                            xs: '14px',
                            md: '14px',
                        },
                        marginTop: '10px',
                        marginBottom: '20px',
                        maxWidth: {
                            sm: '560px',
                            md: '100%',
                        },
                    }}
                >
                    {filteredSolicitacoes.map((solicitacao: any) => {
                        return (
                            <li key={solicitacao.id}>
                                <DefaultCard width="100%">
                                    <CardBoldTitle>Férias</CardBoldTitle>
                                    <Typography>
                                        De{' '}
                                        {dayjs(solicitacao.start.slice(0, 10))
                                            .format('DD/MM/YYYY')
                                            .toString()}{' '}
                                        até{' '}
                                        {dayjs(solicitacao.end.slice(0, 10))
                                            .format('DD/MM/YYYY')
                                            .toString()}
                                    </Typography>
                                    <CardBoldTitle>Mensagem</CardBoldTitle>
                                    <Typography>
                                        {solicitacao.employeeComment}
                                    </Typography>
                                    <CardBoldTitleWithStatus
                                        color={
                                            solicitacao.status === 'Pending'
                                                ? 'grey.500'
                                                : solicitacao.status ===
                                                  'Approved'
                                                ? 'primary'
                                                : 'warning.main'
                                        }
                                    >
                                        {solicitacao.status === 'Pending'
                                            ? 'Pendente'
                                            : solicitacao.status === 'Approved'
                                            ? 'Aprovado'
                                            : 'Reprovado'}
                                    </CardBoldTitleWithStatus>
                                    {solicitacao.status === 'Rejected' ? (
                                        <DefaultButton
                                            content={'Ver Detalhes'}
                                            small={true}
                                            onClick={() => {
                                                setSolicitacaoSelecionada(
                                                    solicitacao
                                                )
                                                handleOpen()
                                            }}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </DefaultCard>
                            </li>
                        )
                    })}

                    {filteredSolicitacoes.length === 0 ? (
                        <DefaultTitle
                            sx={{
                                marginBottom: '5px',
                            }}
                        >
                            Você ainda não possui solicitações de férias
                        </DefaultTitle>
                    ) : (
                        <></>
                    )}
                </Box>
            </Box>
            <DefaultModal
                isOpen={open}
                closeModal={handleClose}
                rejectText={'Fechar'}
            >
                <CardBoldTitle>Férias</CardBoldTitle>
                <Typography>
                    De{' '}
                    {dayjs(solicitacaoSelecionada?.start.slice(0, 10))
                        .format('DD/MM/YYYY')
                        .toString()}{' '}
                    até{' '}
                    {dayjs(solicitacaoSelecionada?.end.slice(0, 10))
                        .format('DD/MM/YYYY')
                        .toString()}
                </Typography>
                <CardBoldTitle>Motivo da Reprovação</CardBoldTitle>
                <Typography marginBottom="1rem">
                    {solicitacaoSelecionada?.managerComment || 'Sem mensagem'}
                </Typography>
            </DefaultModal>
        </Container>
    )
}

export default FuncionarioSolicitacoes
