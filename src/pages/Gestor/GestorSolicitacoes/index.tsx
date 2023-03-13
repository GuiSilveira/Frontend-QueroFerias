import {
    Box,
    Container,
    List,
    ListItem,
    Stack,
    Typography,
} from '@mui/material'
import CardBoldTitle from '../../../components/CardBoldTitle'
import DefaultCard from '../../../components/DefaultCard'
import DefaultFilter from '../../../components/DefaultFilter'
import DefaultTitle from '../../../components/DefaultTitle'
import Header from '../../../components/Header'
import CardBoldTitleWithStatus from '../../../components/CardBoldTitleWithStatus'
import CustomButton from '../../../components/CustomButton'
import { useState } from 'react'
import DefaultModal from '../../../components/DefaultModal'
import DefaultTextArea from '../../../components/DefaultTextArea'

const GestorSolicitacoes = () => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Box>
            <Header />
            <Container
                sx={{
                    marginTop: '71px',
                    marginBottom: '30px',
                }}
            >
                <DefaultTitle>Solicitações</DefaultTitle>
                <DefaultFilter />
                <List
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                    <ListItem
                        sx={{
                            padding: '0',
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                            }}
                        >
                            <DefaultCard>
                                <Stack
                                    flexDirection="column"
                                    justifyContent="space-between"
                                >
                                    <Box marginBottom="1rem">
                                        <CardBoldTitle>
                                            Colaborador
                                        </CardBoldTitle>
                                        <Typography>Fulano de Tal</Typography>
                                        <CardBoldTitle>Férias</CardBoldTitle>
                                        <Typography>
                                            De 08/17/2023 até 08/17/2023
                                        </Typography>
                                        <CardBoldTitle>Mensagem</CardBoldTitle>
                                        <Typography>
                                            Lorem ipsum sit dor amet
                                        </Typography>
                                        <CardBoldTitleWithStatus
                                            color={'grey.500'}
                                        >
                                            Pendente
                                        </CardBoldTitleWithStatus>
                                    </Box>
                                    <Stack
                                        flexDirection="row"
                                        gap="1rem"
                                        margin="auto"
                                    >
                                        <CustomButton
                                            type="approve"
                                            variant="contained"
                                            startIcon={true}
                                        >
                                            Aceitar
                                        </CustomButton>
                                        <CustomButton
                                            type="reject"
                                            startIcon={true}
                                            variant="outlined"
                                            onClick={handleOpen}
                                        >
                                            Recusar
                                        </CustomButton>
                                    </Stack>
                                </Stack>
                            </DefaultCard>
                        </Box>
                    </ListItem>
                </List>
                <DefaultModal
                    isOpen={open}
                    closeModal={handleClose}
                    handleApproval={handleClose}
                    approveText={'Enviar'}
                    rejectText={'Cancelar'}
                >
                    <Box marginBottom="1rem">
                        <CardBoldTitle>Dados da Solicitação</CardBoldTitle>
                        <CardBoldTitle>Colaborador</CardBoldTitle>
                        <Typography>Fulano de Tal</Typography>
                        <CardBoldTitle>Férias</CardBoldTitle>
                        <Typography>De 08/17/2023 até 08/17/2023</Typography>
                        <CardBoldTitle>Mensagem</CardBoldTitle>
                        <Typography>Lorem ipsum sit dor amet</Typography>
                    </Box>
                    <Box marginBottom="1rem">
                        <CardBoldTitle>
                            Informe o motivo da recusa
                        </CardBoldTitle>
                        <DefaultTextArea></DefaultTextArea>
                    </Box>
                </DefaultModal>
            </Container>
        </Box>
    )
}

export default GestorSolicitacoes
