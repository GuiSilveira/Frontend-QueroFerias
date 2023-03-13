import { Box, Container, Typography } from '@mui/material'
import CardBoldTitle from '../../../components/CardBoldTitle'
import CardBoldTitleWithStatus from '../../../components/CardBoldTitleWithStatus'
import DefaultCard from '../../../components/DefaultCard'
import DefaultFilter from '../../../components/DefaultFilter'
import DefaultTitle from '../../../components/DefaultTitle'
import Header from '../../../components/Header'

const FuncionarioSolicitacoes = () => {
    return (
        <>
            <Header />
            <Container>
                <DefaultTitle
                    sx={{
                        marginTop: '71px',
                        marginBottom: '5px',
                    }}
                >
                    Suas Solicitações de Férias
                </DefaultTitle>
                <DefaultFilter />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px',
                        marginTop: '10px',
                        marginBottom: '20px',
                    }}
                >
                    <DefaultCard>
                        <CardBoldTitle>Férias</CardBoldTitle>
                        <Typography>De 08/17/2023 até 08/17/2023</Typography>
                        <CardBoldTitle>Mensagem</CardBoldTitle>
                        <Typography>Lorem, ipsum dolor sit amet</Typography>
                        <CardBoldTitleWithStatus color="grey.500">
                            Pendente
                        </CardBoldTitleWithStatus>
                    </DefaultCard>
                    <DefaultCard>
                        <CardBoldTitle>Férias</CardBoldTitle>
                        <Typography>De 08/17/2023 até 08/17/2023</Typography>
                        <CardBoldTitle>Mensagem</CardBoldTitle>
                        <Typography>Lorem, ipsum dolor sit amet</Typography>
                        <Typography
                            sx={{
                                alignSelf: 'flex-end',
                            }}
                        >
                            Situação:{' '}
                            <Typography
                                fontWeight="bold"
                                color="primary"
                                sx={{
                                    display: 'inline-block',
                                }}
                            >
                                APROVADO
                            </Typography>
                        </Typography>
                    </DefaultCard>
                    <DefaultCard>
                        <CardBoldTitle>Férias</CardBoldTitle>
                        <Typography>De 08/17/2023 até 08/17/2023</Typography>
                        <CardBoldTitle>Mensagem</CardBoldTitle>
                        <Typography>Lorem, ipsum dolor sit amet</Typography>
                        <Typography
                            sx={{
                                alignSelf: 'flex-end',
                            }}
                        >
                            Situação:{' '}
                            <Typography
                                fontWeight="bold"
                                color="warning.main"
                                sx={{
                                    display: 'inline-block',
                                }}
                            >
                                REPROVADO
                            </Typography>
                        </Typography>
                    </DefaultCard>
                    <DefaultCard>
                        <CardBoldTitle>Férias</CardBoldTitle>
                        <Typography>De 08/17/2023 até 08/17/2023</Typography>
                        <CardBoldTitle>Mensagem</CardBoldTitle>
                        <Typography>Lorem, ipsum dolor sit amet</Typography>
                        <Typography
                            fontWeight="bold"
                            sx={{
                                alignSelf: 'flex-end',
                            }}
                        >
                            Situação:{' '}
                            <Typography
                                fontWeight="bold"
                                color="grey.500"
                                sx={{
                                    display: 'inline-block',
                                }}
                            >
                                Pendente
                            </Typography>
                        </Typography>
                    </DefaultCard>
                </Box>
            </Container>
        </>
    )
}

export default FuncionarioSolicitacoes
