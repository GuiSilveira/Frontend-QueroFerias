import { Container, MenuItem } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import DefaultButton from '../../../components/DefaultButton'
import DefaultCard from '../../../components/DefaultCard'
import DefaultSelect from '../../../components/DefaultSelect'
import DefaultTextArea from '../../../components/DefaultTextArea'
import DefaultTitle from '../../../components/DefaultTitle'
import Header from '../../../components/Header'

const FuncionarioSolicitarFerias = () => {
    return (
        <>
            <Header />
            <Container>
                <DefaultTitle
                    sx={{
                        marginTop: '71px',
                        marginBottom: '5px',
                    }}
                >
                    Solicite as suas férias
                </DefaultTitle>
                <DefaultCard>
                    <DefaultSelect
                        label={'Dias de Férias'}
                        labelId={'diasFerias'}
                        options={[
                            <MenuItem key="5" value="5">
                                5
                            </MenuItem>,
                            <MenuItem key="10" value="10">
                                10
                            </MenuItem>,
                        ]}
                    />
                    <DatePicker
                        label="Data de Início"
                        sx={{
                            margin: '20px 0',
                        }}
                    />
                    <DatePicker label="Data de Término" />
                    <DefaultSelect
                        label={'Antecipar 13º?'}
                        labelId={'antecipacaoDecimo'}
                        options={[
                            <MenuItem key="sim" value="sim">
                                Sim
                            </MenuItem>,
                            <MenuItem key="nao" value="nao">
                                Não
                            </MenuItem>,
                        ]}
                    />
                    <DefaultTextArea />
                    <DefaultButton content={'Solicitar Férias'} />
                </DefaultCard>
            </Container>
        </>
    )
}

export default FuncionarioSolicitarFerias
