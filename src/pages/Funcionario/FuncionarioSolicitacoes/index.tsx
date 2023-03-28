import { Box, Container, SelectChangeEvent, Typography } from '@mui/material'
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

const FuncionarioSolicitacoes = () => {
    const token = getAuthToken()
    const { id } = useRouteLoaderData('rootHome') as UserLoaderDataType
    const [open, setOpen] = useState(false)
    const [filter, setFilter] = useState<string>('Todas')
    const [solicitacoes, setSolicitacoes] = useState([])
    const [solicitacaoSelecionada, setSolicitacaoSelecionada] =
        useState<ScheduleType>()

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        ;(async () => {
            const response = await api.get(`/employees/${id}/schedules`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setSolicitacoes(response.data)
        })()
    }, [filter])

    const filteredSolicitacoes = solicitacoes.filter((solicitacao: any) => {
        if (filter === 'todas') {
            return solicitacao
        } else if (filter === 'pendentes' && solicitacao.status === 'Pending') {
            return solicitacao
        } else if (
            filter === 'aprovadas' &&
            solicitacao.status === 'Approved'
        ) {
            return solicitacao
        } else if (
            filter === 'reprovadas' &&
            solicitacao.status === 'Rejected'
        ) {
            return solicitacao
        }
    })

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
                                        De {solicitacao.start} até{' '}
                                        {solicitacao.end}
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
                                        {solicitacao.status}
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
                    De {solicitacaoSelecionada?.start} até{' '}
                    {solicitacaoSelecionada?.end}
                </Typography>
                <CardBoldTitle>Motivo da Reprovação</CardBoldTitle>
                <Typography marginBottom="1rem">
                    {solicitacaoSelecionada?.managerComment}
                </Typography>
            </DefaultModal>
        </Container>
    )
}

export default FuncionarioSolicitacoes
