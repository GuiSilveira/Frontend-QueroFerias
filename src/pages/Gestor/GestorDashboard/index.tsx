import { Container, Stack } from '@mui/material'
import Header from '../../../components/Header'
import CardNotificações from './CardNotificações'
import CardEventosFuturos from './CardEventosFuturos'
import CardTime from './CardTime'
import CardCalendario from './CardCalendario'

const GestorDashboard = () => (
    <>
        <Header />
        <Container
            sx={{
                marginTop: '71px',
                marginBottom: '30px',
            }}
        >
            <Stack gap="30px">
                <CardNotificações />
                <CardEventosFuturos />
                <CardTime />
                <CardCalendario />
            </Stack>
        </Container>
    </>
)

export default GestorDashboard
