import { Box, Container, Divider, Stack, Typography } from '@mui/material'
import Header from '../../../components/Header'
import DefaultTitle from '../../../components/DefaultTitle'
import DefaultCard from '../../../components/DefaultCard'
import DefaultButton from '../../../components/DefaultButton'

const GestorDashboard = () => (
    <>
        <Header />
        <Container
            sx={{
                marginTop: '71px',
            }}
        >
            <Stack gap="30px">
                <Box>
                    <DefaultTitle>Suas Notificações</DefaultTitle>
                    <DefaultCard>
                        <Typography fontWeight="medium" color="grey.500">
                            Notificações
                        </Typography>
                        <Divider />
                        <Typography marginTop="5px">Você possui</Typography>
                        <Typography
                            color="primary.main"
                            fontWeight="bold"
                            fontSize="50px"
                        >
                            9
                        </Typography>
                        <Typography>
                            solicitações de agendamento de férias pendentes
                        </Typography>
                        <DefaultButton
                            small={true}
                            content={'Ir para solicitações'}
                        />
                    </DefaultCard>
                </Box>
                <Box>
                    <DefaultTitle>Eventos Futuros</DefaultTitle>
                </Box>
            </Stack>
        </Container>
    </>
)

export default GestorDashboard
