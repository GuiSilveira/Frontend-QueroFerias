import { MenuItem } from '@mui/material'
import { useState } from 'react'
import DefaultButton from '../../components/DefaultButton'
import DefaultContainer from '../../components/DefaultContainer'
import DefaultInput from '../../components/DefaultInput'
import RoundedCornerContainer from '../../components/RoundedCornerContainer'
import DefaultSelect from '../../components/DefaultSelect'
import { ActionFunctionArgs, Form, useRouteLoaderData } from 'react-router-dom'
import { UserLoaderDataType } from '../../types/types'
import api from '../../services/api'
import { getAuthToken } from '../../util/auth'

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

    return (
        <DefaultContainer marginTop="3rem">
            <RoundedCornerContainer paddingTop="2rem">
                <Form method="post">
                    <DefaultInput
                        focus={focusMatricula}
                        setFocus={setFocusMatricula}
                        label="Matrícula"
                        placeholder="Digite a matrícula"
                        type="text"
                        name="credential"
                    />
                    <DefaultInput
                        focus={focusNome}
                        setFocus={setFocusNome}
                        label="Nome"
                        placeholder="Digite o nome"
                        type="text"
                        name="name"
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
                    <DefaultInput
                        focus={focusArea}
                        setFocus={setFocusArea}
                        label="Área"
                        placeholder="Digite sua área"
                        type="text"
                        name="area"
                    />
                    <DefaultInput
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
                    <DefaultButton content="Finalizar Cadastro" type="submit" />
                </Form>
            </RoundedCornerContainer>
        </DefaultContainer>
    )
}

export default Register

export async function registerAction({ request }: ActionFunctionArgs) {
    try {
        const data = await request.formData()
        const token = getAuthToken()

        const registerData = {
            name: data.get('name'),
            credential: data.get('credential'),
            password: data.get('password'),
            email: data.get('email'),
            gmail: data.get('gmail'),
            area: data.get('area'),
            role: data.get('role'),
            position: data.get('position'),
            contract: data.get('contract'),
        }

        const response = await api.post('/employees', registerData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        // TODO: tratamento de erro para não permitir envio de dados errados.
        // TODO: Colocar snackbar com mensagem de sucesso ou erro

        return null
    } catch (error) {
        console.log(error)
        return null
    }
}
