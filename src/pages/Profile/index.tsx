import {
    Avatar,
    Box,
    Button,
    Container,
    Stack,
    Typography,
} from '@mui/material'
import DefaultCard from '../../components/DefaultCard'
import DefaultTitle from '../../components/DefaultTitle'
import Header from '../../components/Header'

const Profile = () => {
    return (
        <>
            <Header />
            <Container>
                <DefaultTitle
                    sx={{
                        marginTop: '71px',
                    }}
                >
                    Seu Perfil
                </DefaultTitle>
                <Stack gap="15px" marginTop="20px">
                    <Stack alignItems="center" gap="5px">
                        <Avatar
                            sx={{
                                backgroundColor: 'primary.light',
                                color: 'primary.main',
                                width: 100,
                                height: 100,
                                fontSize: 40,
                                fontWeight: 'medium',
                            }}
                        >
                            F
                        </Avatar>
                        <Button
                            variant="text"
                            size="small"
                            sx={{
                                cursor: 'pointer',
                                textDecoration: 'underline',
                            }}
                        >
                            Mudar Avatar
                        </Button>
                    </Stack>
                    <DefaultCard>
                        <Stack gap="10px">
                            <Box>
                                <Typography
                                    fontWeight="bold"
                                    color="primary.main"
                                >
                                    Nome:
                                </Typography>
                                <Typography>Fulano de Tal</Typography>
                            </Box>
                            <Stack direction="row" gap="10px">
                                <Box>
                                    <Typography
                                        fontWeight="bold"
                                        color="primary.main"
                                    >
                                        Senha:
                                    </Typography>
                                    <Typography>******</Typography>
                                </Box>
                                <Button
                                    size="small"
                                    sx={{
                                        backgroundColor: 'secondary.main',
                                        color: 'secondary.dark',
                                        borderRadius: '5px',
                                        height: '25px',
                                        alignSelf: 'flex-end',
                                        ':hover': {
                                            backgroundColor: 'secondary.dark',
                                            color: 'secondary.main',
                                        },
                                        transition: 'all ease-in-out 0.3s',
                                    }}
                                >
                                    Editar
                                </Button>
                            </Stack>
                            <Box>
                                <Typography
                                    fontWeight="bold"
                                    color="primary.main"
                                >
                                    Matrícula:
                                </Typography>
                                <Typography>123456</Typography>
                            </Box>
                            <Box>
                                <Typography
                                    fontWeight="bold"
                                    color="primary.main"
                                >
                                    Email:
                                </Typography>
                                <Typography>
                                    fulaninho.detal@verdecard.com
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    fontWeight="bold"
                                    color="primary.main"
                                >
                                    Função:
                                </Typography>
                                <Typography>
                                    Programador Full Stack Júnior
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    fontWeight="bold"
                                    color="primary.main"
                                >
                                    Gestor:
                                </Typography>
                                <Typography>Gestor Tal</Typography>
                            </Box>
                        </Stack>
                    </DefaultCard>
                </Stack>
            </Container>
        </>
    )
}

export default Profile
