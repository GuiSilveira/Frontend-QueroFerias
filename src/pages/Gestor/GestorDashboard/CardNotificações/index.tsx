import { Box, Typography, Divider } from '@mui/material'
import DefaultButton from '../../../../components/DefaultButton'
import DefaultCard from '../../../../components/DefaultCard'
import DefaultTitle from '../../../../components/DefaultTitle'

const CardNotificações = () => {
    return (
        <Box>
            <DefaultTitle>Suas Notificações</DefaultTitle>
            <DefaultCard>
                <Typography fontWeight="medium" color="grey.500">
                    Notificações
                </Typography>
                <Divider />
                <Typography marginTop="5px">Você possui</Typography>
                <Typography
                    color="primary.main"
                    fontWeight="bold"
                    fontSize="50px"
                >
                    9
                </Typography>
                <Typography>
                    solicitações de agendamento de férias pendentes
                </Typography>
                <DefaultButton small={true} content={'Ir para solicitações'} />
            </DefaultCard>
        </Box>
    )
}

export default CardNotificações
