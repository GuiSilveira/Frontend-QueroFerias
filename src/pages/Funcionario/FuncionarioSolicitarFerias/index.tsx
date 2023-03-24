import { Box, Container, MenuItem } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import DefaultButton from '../../../components/DefaultButton'
import DefaultCard from '../../../components/DefaultCard'
import DefaultSelect from '../../../components/DefaultSelect'
import DefaultTextArea from '../../../components/DefaultTextArea'
import DefaultTitle from '../../../components/DefaultTitle'

const FuncionarioSolicitarFerias = () => {
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
            <Box>
                <DefaultTitle
                    sx={{
                        marginTop: '71px',
                        marginBottom: '5px',
                        alignSelf: 'flex-start',
                    }}
                >
                    Solicite as suas férias
                </DefaultTitle>
                <DefaultCard
                    minWidth={{
                        xs: 'calc(100vw - 2rem)',
                        md: '600px',
                    }}
                    maxWidth={{
                        xs: 'calc(100vw - 2rem)',
                        md: '500px',
                    }}
                >
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
            </Box>
        </Container>
    )
}

export default FuncionarioSolicitarFerias
