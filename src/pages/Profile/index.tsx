import {
    Avatar,
    Box,
    CircularProgress,
    Container,
    List,
    ListItem,
    Stack,
    Typography,
} from '@mui/material'
import DefaultCard from '../../components/DefaultCard'
import DefaultTitle from '../../components/DefaultTitle'
import { useUserDataStore } from '../../store/useUserData'

const Profile = () => {
    const userData = useUserDataStore((state: any) => state.userData)

    if (!userData.id) {
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
                        {userData?.name[0].toUpperCase()}
                    </Avatar>
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
                                    <Typography>{userData.name}</Typography>
                                </Box>
                            </ListItem>
                            {/* <ListItem>
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
                                        handleApproval={async () => {
                                            await api.patch('')
                                            
                                            handleClose()
                                        }}
                                        approveText={'Alterar'}
                                        rejectText={'Cancelar'}
                                    >
                                        <DefaultInput
                                            focus={focusPassword}
                                            setFocus={setFocusPassword}
                                            setChange={setPassword}
                                            label={'Nova Senha'}
                                            placeholder={
                                                'Digite uma nova senha...'
                                            }
                                            type={'password'}
                                            marginBottom="1rem"
                                            name="password"
                                        />
                                    </DefaultModal>
                                </Stack>
                            </ListItem> */}
                            <ListItem>
                                <Box>
                                    <Typography
                                        fontWeight="bold"
                                        color="primary.main"
                                    >
                                        Matrícula:
                                    </Typography>
                                    <Typography>
                                        {userData.credential}
                                    </Typography>
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
                                    <Typography>{userData.email}</Typography>
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
                                    <Typography>{userData.gmail}</Typography>
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
                                    <Typography>{userData.role}</Typography>
                                </Box>
                            </ListItem>
                            {/* <ListItem>
                                <Box>
                                    <Typography
                                        fontWeight="bold"
                                        color="primary.main"
                                    >
                                        Gestor:
                                    </Typography>
                                    <Typography>
                                        {userData.idManager}
                                    </Typography>
                                </Box>
                            </ListItem> */}
                        </List>
                    </Stack>
                </DefaultCard>
            </Stack>
        </Container>
    )
}

export default Profile
