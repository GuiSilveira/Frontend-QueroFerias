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

const Register = () => {
    const [focusMatricula, setFocusMatricula] = useState<boolean>(false)
    const [focusEmail, setFocusEmail] = useState<boolean>(false)
    const [focusPassword, setFocusPassword] = useState<boolean>(false)
    const theme = useTheme()

    return (
        <DefaultContainer>
            <Box
                sx={{
                    textAlign: 'center',
                    position: 'relative',
                    paddingTop: '2.25rem',
                    paddingBottom: '0.8rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <IconButton
                    sx={{
                        marginRight: '50px',
                        position: 'absolute',
                        left: '10px',
                        bottom: 'center',
                    }}
                >
                    <ArrowBackIcon
                        sx={{
                            color: `${theme.palette.common.white}`,
                        }}
                    />
                </IconButton>

                <Box
                    component="img"
                    src={Logo}
                    sx={{
                        textAlign: 'center',
                    }}
                />
            </Box>
            <RoundedCornerContainer paddingTop="2.5rem">
                <DefaultInput
                    focus={focusMatricula}
                    setFocus={setFocusMatricula}
                    label="Matrícula"
                    placeholder="Digite a matrícula"
                    type="text"
                />
                <DefaultInput
                    focus={focusEmail}
                    setFocus={setFocusEmail}
                    label="Email"
                    placeholder="Digite um email"
                    type="email"
                />
                <DefaultInput
                    focus={focusPassword}
                    setFocus={setFocusPassword}
                    label="Senha"
                    placeholder="Digite uma senha"
                    type="password"
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
