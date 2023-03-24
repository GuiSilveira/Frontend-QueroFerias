import { Box, IconButton, MenuItem } from '@mui/material'
import { useState } from 'react'
import DefaultButton from '../../components/DefaultButton'
import DefaultContainer from '../../components/DefaultContainer'
import DefaultInput from '../../components/DefaultInput'
import RoundedCornerContainer from '../../components/RoundedCornerContainer'
import Logo from '../../assets/logo.svg'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useTheme } from '@mui/material/styles'
import DefaultSelect from '../../components/DefaultSelect'
import { Link, useRouteLoaderData } from 'react-router-dom'

const Register = () => {
    const [focusMatricula, setFocusMatricula] = useState<boolean>(false)
    const [focusEmail, setFocusEmail] = useState<boolean>(false)
    const [focusGmail, setFocusGmail] = useState<boolean>(false)
    const [focusPassword, setFocusPassword] = useState<boolean>(false)
    const theme = useTheme()
    const data = useRouteLoaderData('rootHome')

    console.log(data)

    return (
        <DefaultContainer>
            <Box
                sx={{
                    textAlign: 'center',
                    position: 'relative',
                    paddingTop: '2.25rem',
                    paddingBottom: '0.8rem',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '100%',
                    '&::after': {
                        content: '"D"',
                        visibility: 'hidden',
                        marginRight: '1rem',
                        width: '1.5rem',
                        height: '1.5rem',
                        padding: '8px',
                    },
                }}
            >
                <Link to={'/'}>
                    <IconButton
                        sx={{
                            marginLeft: '1rem',
                        }}
                    >
                        <ArrowBackIcon
                            sx={{
                                color: `${theme.palette.common.white}`,
                            }}
                        />
                    </IconButton>
                </Link>

                <Box
                    component="img"
                    src={Logo}
                    sx={{
                        textAlign: 'center',
                        justifyItems: 'center',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                />
            </Box>
            <RoundedCornerContainer>
                <DefaultInput
                    focus={focusMatricula}
                    setFocus={setFocusMatricula}
                    label="Matrícula"
                    placeholder="Digite a matrícula"
                    type="text"
                    name="matricula"
                />
                <DefaultInput
                    focus={focusEmail}
                    setFocus={setFocusEmail}
                    label="Email"
                    placeholder="Digite um email"
                    type="email"
                    name="email"
                />
                <DefaultInput
                    focus={focusGmail}
                    setFocus={setFocusGmail}
                    label="Gmail"
                    placeholder="Digite seu gmail"
                    type="email"
                    name="gmail"
                />
                <DefaultInput
                    focus={focusPassword}
                    setFocus={setFocusPassword}
                    label="Senha"
                    placeholder="Digite uma senha"
                    type="password"
                    name="password"
                />
                <DefaultSelect
                    label={'Função'}
                    labelId={'funcao'}
                    options={[
                        <MenuItem key="funcionario" value="funcionario">
                            Funcionário
                        </MenuItem>,
                        <MenuItem key="gestor" value="gestor">
                            Gestor
                        </MenuItem>,
                    ]}
                />
                <DefaultSelect
                    label={'Tipo de Contratação'}
                    labelId={'tipoContratacao'}
                    options={[
                        <MenuItem key="clt" value="clt">
                            CLT
                        </MenuItem>,
                        <MenuItem key="pj" value="pj">
                            PJ
                        </MenuItem>,
                    ]}
                />
                <DefaultButton content="Finalizar Cadastro" />
            </RoundedCornerContainer>
        </DefaultContainer>
    )
}

export default Register
