import { Box, Container, Typography, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import DefaultButton from '../../components/DefaultButton'
import DefaultInput from '../../components/DefaultInput'
import Logo from '../../assets/logo.svg'
import RoundedCornerContainer from '../../components/RoundedCornerContainer'
import DefaultContainer from '../../components/DefaultContainer'

const Login = () => {
    const [focusMatricula, setFocusMatricula] = useState<boolean>(false)
    const [focusPassword, setFocusPassword] = useState<boolean>(false)
    const mobile = useMediaQuery('(max-width: 500px)')

    return (
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
                    <Typography fontSize={`${mobile ? '0.875rem' : '1rem'}`}>
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
                />
                <DefaultInput
                    focus={focusPassword}
                    setFocus={setFocusPassword}
                    label="Senha"
                    placeholder="Digite aqui sua senha"
                    type="password"
                />
                <DefaultButton content="Entrar" />
            </RoundedCornerContainer>
        </DefaultContainer>
    )
}

export default Login
