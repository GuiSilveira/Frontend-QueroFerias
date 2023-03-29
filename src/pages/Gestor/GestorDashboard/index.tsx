import { Box, Container, Stack } from '@mui/material'
import CardNotificações from './CardNotificações'
import CardTime from './CardTime'
import CardCalendario from './CardCalendario'

const GestorDashboard = () => (
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
            marginTop: '71px',
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
        <Stack
            gap="30px"
            sx={{
                width: {
                    xs: 'calc(100vw - 2rem)',
                    md: '100%',
                },
                paddingRight: {
                    md: '2rem',
                },
                paddingBottom: {
                    xs: '2rem',
                },
            }}
        >
            <Box
                width={{
                    md: '100%',
                    lg: '50%',
                }}
                display="flex"
                flexDirection={{
                    xs: 'column',
                }}
                gap="1rem"
                justifyContent={'space-evenly'}
            >
                <CardNotificações />

                <CardTime />
            </Box>
            <CardCalendario />
        </Stack>
    </Container>
)

export default GestorDashboard
