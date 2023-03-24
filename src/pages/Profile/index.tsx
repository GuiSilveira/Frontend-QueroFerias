import {
    Avatar,
    Box,
    Button,
    Container,
    List,
    ListItem,
    Stack,
    Typography,
} from '@mui/material'
import { useState } from 'react'
import DefaultCard from '../../components/DefaultCard'
import DefaultInput from '../../components/DefaultInput'
import DefaultModal from '../../components/DefaultModal'
import DefaultTitle from '../../components/DefaultTitle'

const Profile = () => {
    const [open, setOpen] = useState(false)
    const [focusPassword, setFocusPassword] = useState<boolean>(false)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
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
            <DefaultTitle
                sx={{
                    marginTop: '71px',
                    alignSelf: 'flex-start',
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
                <DefaultCard
                    width={{
                        xs: 'calc(100vw - 2rem)',
                        md: '300px',
                        lg: '100%',
                    }}
                >
                    <Stack gap="10px">
                        <List>
                            <ListItem>
                                <Box>
                                    <Typography
                                        fontWeight="bold"
                                        color="primary.main"
                                    >
                                        Nome:
                                    </Typography>
                                    <Typography>Fulano de Tal</Typography>
                                </Box>
                            </ListItem>
                            <ListItem>
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
                                        onClick={handleOpen}
                                        size="small"
                                        sx={{
                                            backgroundColor: 'secondary.main',
                                            color: 'secondary.dark',
                                            borderRadius: '5px',
                                            height: '25px',
                                            alignSelf: 'flex-end',
                                            ':hover': {
                                                backgroundColor:
                                                    'secondary.dark',
                                                color: 'secondary.main',
                                            },
                                            transition: 'all ease-in-out 0.3s',
                                        }}
                                    >
                                        Editar
                                    </Button>
                                    <DefaultModal
                                        isOpen={open}
                                        closeModal={handleClose}
                                        handleApproval={handleClose}
                                        approveText={'Alterar'}
                                        rejectText={'Cancelar'}
                                    >
                                        <DefaultInput
                                            focus={focusPassword}
                                            setFocus={setFocusPassword}
                                            label={'Nova Senha'}
                                            placeholder={
                                                'Digite uma nova senha...'
                                            }
                                            type={'password'}
                                            marginBottom="1rem"
                                        />
                                    </DefaultModal>
                                </Stack>
                            </ListItem>
                            <ListItem>
                                <Box>
                                    <Typography
                                        fontWeight="bold"
                                        color="primary.main"
                                    >
                                        Matrícula:
                                    </Typography>
                                    <Typography>123456</Typography>
                                </Box>
                            </ListItem>
                            <ListItem>
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
                            </ListItem>
                            <ListItem>
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
                            </ListItem>
                            <ListItem>
                                <Box>
                                    <Typography
                                        fontWeight="bold"
                                        color="primary.main"
                                    >
                                        Gestor:
                                    </Typography>
                                    <Typography>Gestor Tal</Typography>
                                </Box>
                            </ListItem>
                        </List>
                    </Stack>
                </DefaultCard>
            </Stack>
        </Container>
    )
}

export default Profile
