import { Box, Button, Container, Stack, Typography } from '@mui/material'
import CardBoldTitle from '../../../components/CardBoldTitle'
import DefaultCard from '../../../components/DefaultCard'
import DefaultFilter from '../../../components/DefaultFilter'
import DefaultTitle from '../../../components/DefaultTitle'
import Header from '../../../components/Header'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'
import CardBoldTitleWithStatus from '../../../components/CardBoldTitleWithStatus'

const GestorSolicitacoes = () => {
    return (
        <Box>
            <Header />
            <Container
                sx={{
                    marginTop: '71px',
                    marginBottom: '30px',
                }}
            >
                <DefaultTitle>Solicitações</DefaultTitle>
                <DefaultFilter />
                <Box marginTop="0.75rem">
                    <DefaultCard>
                        <Stack
                            flexDirection="column"
                            justifyContent="space-between"
                        >
                            <Box marginBottom="1rem">
                                <CardBoldTitle>Colaborador</CardBoldTitle>
                                <Typography>Fulano de Tal</Typography>
                                <CardBoldTitle>Férias</CardBoldTitle>
                                <Typography>
                                    De 08/17/2023 até 08/17/2023
                                </Typography>
                                <CardBoldTitle>Mensagem</CardBoldTitle>
                                <Typography>
                                    Lorem ipsum sit dor amet
                                </Typography>
                                <CardBoldTitleWithStatus color={'grey.500'}>
                                    Pendente
                                </CardBoldTitleWithStatus>
                            </Box>
                            <Stack flexDirection="row" gap="1rem" margin="auto">
                                // TODO: Componentizar esses botões
                                <Button
                                    variant="contained"
                                    startIcon={<DoneIcon />}
                                    color="primary"
                                    sx={{
                                        color: 'white',
                                    }}
                                >
                                    Aceitar
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<ClearIcon />}
                                    color="warning"
                                    sx={{
                                        color: 'warning.main',
                                    }}
                                >
                                    Recusar
                                </Button>
                            </Stack>
                        </Stack>
                    </DefaultCard>
                </Box>
            </Container>
        </Box>
    )
}

export default GestorSolicitacoes
