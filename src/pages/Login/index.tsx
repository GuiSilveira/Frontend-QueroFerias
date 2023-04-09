import {
    Alert,
    AlertColor,
    Box,
    Snackbar,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material'
import { useState } from 'react'
import DefaultButton from '../../components/DefaultButton'
import DefaultInput from '../../components/DefaultInput'
import Logo from '../../assets/logo.svg'
import RoundedCornerContainer from '../../components/RoundedCornerContainer'
import DefaultContainer from '../../components/DefaultContainer'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

const Login = () => {
    const [focusMatricula, setFocusMatricula] = useState<boolean>(false)
    const [focusPassword, setFocusPassword] = useState<boolean>(false)
    const [matricula, setMatricula] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [snackbarMessage, setSnackbarMessage] = useState<string>('')
    const [snackbarSeverity, setSnackbarSeverity] =
        useState<AlertColor>('success')
    const navigate = useNavigate()

    const mobile = useMediaQuery('(max-width: 500px)')

    const handleClose = () => {
        setOpenSnackbar(false)
    }

    return (
        <>
            <DefaultContainer>
                <Box>
                    <Box
                        component="img"
                        src={Logo}
                        sx={{
                            marginTop: '4.125rem',
                            marginBottom: '1.25rem',
                            width: 'fit-content',
                            alignSelf: 'center',
                        }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            margin: '0 1rem 1rem 1rem',
                            textAlign: 'left',
                        }}
                    >
                        <Typography fontSize="1.75rem" fontWeight="bold">
                            Olá!{' '}
                        </Typography>
                        <Typography fontSize="1.75rem" fontWeight="bold">
                            Seja bem-vindo.
                        </Typography>
                        <Typography
                            fontSize={`${mobile ? '0.875rem' : '1rem'}`}
                        >
                            Preencha as informações para acessar sua conta
                        </Typography>
                    </Box>
                </Box>
                <RoundedCornerContainer>
                    <DefaultInput
                        focus={focusMatricula}
                        setFocus={setFocusMatricula}
                        label="Matrícula"
                        placeholder="Ex: 985000"
                        type="text"
                        setChange={setMatricula}
                        name="matricula"
                    />
                    <DefaultInput
                        focus={focusPassword}
                        setFocus={setFocusPassword}
                        label="Senha"
                        placeholder="Digite aqui sua senha"
                        type="password"
                        setChange={setPassword}
                        name="password"
                    />
                    <DefaultButton
                        content="Entrar"
                        onClick={async () => {
                            try {
                                const authData = {
                                    credential: matricula,
                                    password,
                                }

                                const response = await api.post(
                                    '/auth/login',
                                    authData
                                )

                                const { accessToken } = response.data
                                localStorage.setItem('token', accessToken)

                                setSnackbarMessage(
                                    'Login realizado com sucesso'
                                )
                                setSnackbarSeverity('success')
                                setOpenSnackbar(true)

                                setTimeout(() => {
                                    navigate('/home')
                                }, 1000)
                            } catch (error: any) {
                                setSnackbarMessage(
                                    'Matrícula e/ou senha incorretos.'
                                )
                                setSnackbarSeverity('error')
                                setOpenSnackbar(true)

                                return error
                            }
                        }}
                    />
                </RoundedCornerContainer>
            </DefaultContainer>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleClose}
                sx={{
                    position: 'absolute',
                    top: '80%',
                    zIndex: 9999,
                }}
            >
                <Alert
                    onClose={handleClose}
                    severity={snackbarSeverity}
                    sx={{
                        width: '100%',
                        border: `1px solid ${
                            snackbarSeverity === 'success'
                                ? '#27AE60'
                                : '#FF5252'
                        }`,
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Login
