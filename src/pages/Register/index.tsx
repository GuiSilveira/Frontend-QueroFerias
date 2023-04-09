import { Alert, AlertColor, MenuItem, Snackbar } from '@mui/material'
import { useState } from 'react'
import DefaultButton from '../../components/DefaultButton'
import DefaultContainer from '../../components/DefaultContainer'
import DefaultInput from '../../components/DefaultInput'
import RoundedCornerContainer from '../../components/RoundedCornerContainer'
import DefaultSelect from '../../components/DefaultSelect'
import { LocalizationProvider } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import api from '../../services/api'
import { getAuthToken } from '../../util/auth'
import { DateField } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const Register = () => {
    const [focusMatricula, setFocusMatricula] = useState<boolean>(false)
    const [focusNome, setFocusNome] = useState<boolean>(false)
    const [focusEmail, setFocusEmail] = useState<boolean>(false)
    const [focusGmail, setFocusGmail] = useState<boolean>(false)
    const [focusPassword, setFocusPassword] = useState<boolean>(false)
    const [focusArea, setFocusArea] = useState<boolean>(false)
    const [focusFuncao, setFocusFuncao] = useState<boolean>(false)
    const [position, setPosition] = useState<string>('')
    const [contract, setContract] = useState<string>('')
    const [contractDate, setContractDate] = useState<Dayjs | null>(
        dayjs(new Date())
    )
    const [name, setName] = useState<string>('')
    const [credential, setCredential] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [gmail, setGmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [area, setArea] = useState<string>('')
    const [role, setRole] = useState<string>('')
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [snackbarMessage, setSnackbarMessage] = useState<string>('')
    const [snackbarSeverity, setSnackbarSeverity] =
        useState<AlertColor>('success')

    const handleClose = () => {
        setOpenSnackbar(false)
    }

    return (
        <>
            <DefaultContainer marginTop="3rem">
                <RoundedCornerContainer paddingTop="2rem">
                    <DefaultInput
                        setChange={setCredential}
                        focus={focusMatricula}
                        setFocus={setFocusMatricula}
                        label="Matrícula"
                        placeholder="Digite a matrícula"
                        type="text"
                        name="credential"
                    />
                    <DefaultInput
                        setChange={setName}
                        focus={focusNome}
                        setFocus={setFocusNome}
                        label="Nome"
                        placeholder="Digite o nome"
                        type="text"
                        name="name"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField
                            value={contractDate}
                            onChange={(newValue) => setContractDate(newValue)}
                            name="contractDate"
                            label="Data de Contratacao"
                            format="YYYY-MM-DD"
                            sx={{
                                width: '100%',
                                marginTop: '20px',
                            }}
                        />
                    </LocalizationProvider>
                    <DefaultInput
                        setChange={setEmail}
                        focus={focusEmail}
                        setFocus={setFocusEmail}
                        label="Email"
                        placeholder="Digite um email"
                        type="email"
                        name="email"
                    />
                    <DefaultInput
                        setChange={setGmail}
                        focus={focusGmail}
                        setFocus={setFocusGmail}
                        label="Gmail"
                        placeholder="Digite seu gmail"
                        type="email"
                        name="gmail"
                    />
                    <DefaultInput
                        setChange={setPassword}
                        focus={focusPassword}
                        setFocus={setFocusPassword}
                        label="Senha"
                        placeholder="Digite uma senha"
                        type="password"
                        name="password"
                    />
                    <DefaultInput
                        setChange={setArea}
                        focus={focusArea}
                        setFocus={setFocusArea}
                        label="Área"
                        placeholder="Digite sua área"
                        type="text"
                        name="area"
                    />
                    <DefaultInput
                        setChange={setRole}
                        focus={focusFuncao}
                        setFocus={setFocusFuncao}
                        label="Função"
                        placeholder="Digite sua função"
                        type="text"
                        name="role"
                    />
                    <DefaultSelect
                        label={'Posição'}
                        labelId={'posicao'}
                        name="position"
                        value={position}
                        onChange={(event) => {
                            setPosition(event.target.value)
                        }}
                    >
                        <MenuItem key="funcionario" value="Employee">
                            Funcionário
                        </MenuItem>
                        <MenuItem key="gestor" value="Manager">
                            Gestor
                        </MenuItem>
                    </DefaultSelect>
                    <DefaultSelect
                        label={'Tipo de Contratação'}
                        labelId={'tipoContratacao'}
                        name="contract"
                        value={contract}
                        onChange={(event) => {
                            setContract(event.target.value)
                        }}
                    >
                        <MenuItem key="clt" value="CLT">
                            CLT
                        </MenuItem>

                        <MenuItem key="pj" value="PJ">
                            PJ
                        </MenuItem>
                    </DefaultSelect>
                    <DefaultButton
                        content="Finalizar Cadastro"
                        type="submit"
                        onClick={async () => {
                            try {
                                const token = getAuthToken()

                                const registerData = {
                                    name,
                                    credential,
                                    password,
                                    email,
                                    gmail,
                                    area,
                                    role,
                                    position,
                                    contract,
                                    contractDate,
                                }

                                const response = await api.post(
                                    '/employees',
                                    registerData,
                                    {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                        },
                                    }
                                )

                                setSnackbarMessage(
                                    'Usuário cadastrado com sucesso'
                                )
                                setSnackbarSeverity('success')
                                setOpenSnackbar(true)

                                return null
                            } catch (error: any) {
                                setSnackbarMessage('Erro ao cadastrar usuário')
                                setSnackbarSeverity('error')
                                setOpenSnackbar(true)
                                return null
                            }
                        }}
                    />
                </RoundedCornerContainer>
            </DefaultContainer>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
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

export default Register
