import { Box, Container, Typography } from '@mui/material'
import { useState } from 'react'
import CardBoldTitle from '../../../components/CardBoldTitle'
import CardBoldTitleWithStatus from '../../../components/CardBoldTitleWithStatus'
import DefaultButton from '../../../components/DefaultButton'
import DefaultCard from '../../../components/DefaultCard'
import DefaultFilter from '../../../components/DefaultFilter'
import DefaultModal from '../../../components/DefaultModal'
import DefaultTitle from '../../../components/DefaultTitle'
import Header from '../../../components/Header'

const FuncionarioSolicitacoes = () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Header />
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
                        <DefaultFilter />
                    </Box>
                    <Box
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
                        <DefaultCard>
                            <CardBoldTitle>Férias</CardBoldTitle>
                            <Typography>
                                De 08/17/2023 até 08/17/2023
                            </Typography>
                            <CardBoldTitle>Mensagem</CardBoldTitle>
                            <Typography>Lorem, ipsum dolor sit amet</Typography>
                            <CardBoldTitleWithStatus color="grey.500">
                                Pendente
                            </CardBoldTitleWithStatus>
                        </DefaultCard>

                        <DefaultCard>
                            <CardBoldTitle>Férias</CardBoldTitle>
                            <Typography>
                                De 08/17/2023 até 08/17/2023
                            </Typography>
                            <CardBoldTitle>Mensagem</CardBoldTitle>
                            <Typography>Lorem, ipsum dolor sit amet</Typography>
                            <CardBoldTitleWithStatus color="warning.main">
                                Reprovado
                            </CardBoldTitleWithStatus>
                            <DefaultButton
                                content={'Ver Detalhes'}
                                small={true}
                                onClick={handleOpen}
                            />
                        </DefaultCard>
                        <DefaultCard>
                            <CardBoldTitle>Férias</CardBoldTitle>
                            <Typography>
                                De 08/17/2023 até 08/17/2023
                            </Typography>
                            <CardBoldTitle>Mensagem</CardBoldTitle>
                            <Typography>Lorem, ipsum dolor sit amet</Typography>
                            <CardBoldTitleWithStatus color="warning.main">
                                Reprovado
                            </CardBoldTitleWithStatus>
                            <DefaultButton
                                content={'Ver Detalhes'}
                                small={true}
                                onClick={handleOpen}
                            />
                        </DefaultCard>
                        <DefaultCard>
                            <CardBoldTitle>Férias</CardBoldTitle>
                            <Typography>
                                De 08/17/2023 até 08/17/2023
                            </Typography>
                            <CardBoldTitle>Mensagem</CardBoldTitle>
                            <Typography>Lorem, ipsum dolor sit amet</Typography>
                            <CardBoldTitleWithStatus color="warning.main">
                                Reprovado
                            </CardBoldTitleWithStatus>
                            <DefaultButton
                                content={'Ver Detalhes'}
                                small={true}
                                onClick={handleOpen}
                            />
                        </DefaultCard>
                        <DefaultCard>
                            <CardBoldTitle>Férias</CardBoldTitle>
                            <Typography>
                                De 08/17/2023 até 08/17/2023
                            </Typography>
                            <CardBoldTitle>Mensagem</CardBoldTitle>
                            <Typography>Lorem, ipsum dolor sit amet</Typography>
                            <CardBoldTitleWithStatus color="warning.main">
                                Reprovado
                            </CardBoldTitleWithStatus>
                            <DefaultButton
                                content={'Ver Detalhes'}
                                small={true}
                                onClick={handleOpen}
                            />
                        </DefaultCard>
                    </Box>
                </Box>
                <DefaultModal
                    isOpen={open}
                    closeModal={handleClose}
                    rejectText={'Fechar'}
                >
                    <CardBoldTitle>Férias</CardBoldTitle>
                    <Typography>De 08/17/2023 até 08/17/2023</Typography>
                    <CardBoldTitle>Motivo da Reprovação</CardBoldTitle>
                    <Typography>Lorem, ipsum dolor sit amet</Typography>
                    <CardBoldTitle>Gestor</CardBoldTitle>
                    <Typography>Fulano</Typography>
                </DefaultModal>
            </Container>
        </>
    )
}

export default FuncionarioSolicitacoes
