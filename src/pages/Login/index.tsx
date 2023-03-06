import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import DefaultButton from '../../components/DefaultButton'
import DefaultInput from '../../components/DefaultInput'
import Logo from '../../assets/logo.svg'
import RoundedCornerContainer from '../../components/RoundedCornerContainer'
import DefaultContainer from '../../components/DefaultContainer'

const Login = () => {
    const [focusMatricula, setFocusMatricula] = useState<boolean>(false)
    const [focusPassword, setFocusPassword] = useState<boolean>(false)

    return (
        <DefaultContainer>
            <Box
                component="img"
                src={Logo}
                sx={{
                    marginTop: '4.125rem',
                    marginBottom: '1.25rem',
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    margin: '0 1rem .6rem 1rem',
                }}
            >
                <Typography fontSize="1.75rem" fontWeight="bold">
                    Olá!{' '}
                </Typography>
                <Typography fontSize="1.75rem" fontWeight="bold">
                    Seja bem-vindo.
                </Typography>
                <Typography fontSize="0.875rem">
                    Preencha as informações para acessar sua conta
                </Typography>
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
