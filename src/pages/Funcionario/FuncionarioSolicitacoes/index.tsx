import { Box, Container, Typography } from '@mui/material'
import { useState } from 'react'
import CardBoldTitle from '../../../components/CardBoldTitle'
import CardBoldTitleWithStatus from '../../../components/CardBoldTitleWithStatus'
import DefaultButton from '../../../components/DefaultButton'
import DefaultCard from '../../../components/DefaultCard'
import DefaultFilter from '../../../components/DefaultFilter'
import DefaultModal from '../../../components/DefaultModal'
import DefaultTitle from '../../../components/DefaultTitle'
import Header from '../../../components/Header'

const FuncionarioSolicitacoes = () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

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
                    Suas Solicitações de Férias
                </DefaultTitle>
                <DefaultFilter />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px',
                        marginTop: '10px',
                        marginBottom: '20px',
                    }}
                >
                    <DefaultCard>
                        <CardBoldTitle>Férias</CardBoldTitle>
                        <Typography>De 08/17/2023 até 08/17/2023</Typography>
                        <CardBoldTitle>Mensagem</CardBoldTitle>
                        <Typography>Lorem, ipsum dolor sit amet</Typography>
                        <CardBoldTitleWithStatus color="grey.500">
                            Pendente
                        </CardBoldTitleWithStatus>
                    </DefaultCard>

                    <DefaultCard>
                        <CardBoldTitle>Férias</CardBoldTitle>
                        <Typography>De 08/17/2023 até 08/17/2023</Typography>
                        <CardBoldTitle>Mensagem</CardBoldTitle>
                        <Typography>Lorem, ipsum dolor sit amet</Typography>
                        <CardBoldTitleWithStatus color="warning.main">
                            Reprovado
                        </CardBoldTitleWithStatus>
                        <DefaultButton
                            content={'Ver Detalhes'}
                            small={true}
                            onClick={handleOpen}
                        />
                    </DefaultCard>
                </Box>
                <DefaultModal
                    isOpen={open}
                    closeModal={handleClose}
                    rejectText={'Fechar'}
                >
                    <CardBoldTitle>Férias</CardBoldTitle>
                    <Typography>De 08/17/2023 até 08/17/2023</Typography>
                    <CardBoldTitle>Motivo da Reprovação</CardBoldTitle>
                    <Typography>Lorem, ipsum dolor sit amet</Typography>
                    <CardBoldTitle>Gestor</CardBoldTitle>
                    <Typography>Fulano</Typography>
                </DefaultModal>
            </Container>
        </>
    )
}

export default FuncionarioSolicitacoes
