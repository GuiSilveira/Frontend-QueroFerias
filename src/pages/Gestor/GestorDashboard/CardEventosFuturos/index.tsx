import { Box, Stack, Typography } from '@mui/material'
import DefaultCard from '../../../../components/DefaultCard'
import DefaultTitle from '../../../../components/DefaultTitle'
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined'

const CardEventosFuturos = () => {
    return (
        <Box>
            <DefaultTitle>Eventos Futuros</DefaultTitle>
            <Stack gap="1rem">
                <DefaultCard>
                    <Box display="flex" alignItems="center" gap="5px">
                        <AdjustOutlinedIcon
                            color="primary"
                            sx={{
                                fontSize: '0.75rem',
                            }}
                        />
                        <Typography fontSize="0.75rem" color="grey.500">
                            Dia 10 até dia 17
                        </Typography>
                    </Box>
                    <Typography fontWeight="medium">
                        Fulano de Tal estará de férias
                    </Typography>
                    <Typography fontSize="0.75rem" color="grey.500">
                        Ficará 10 dias fora do trabalho
                    </Typography>
                </DefaultCard>
                <DefaultCard>
                    <Box display="flex" alignItems="center" gap="5px">
                        <AdjustOutlinedIcon
                            color="primary"
                            sx={{
                                fontSize: '0.75rem',
                            }}
                        />
                        <Typography fontSize="0.75rem" color="grey.500">
                            Dia 10 até dia 17
                        </Typography>
                    </Box>
                    <Typography fontWeight="medium">
                        Fulano de Tal estará de férias
                    </Typography>
                    <Typography fontSize="0.75rem" color="grey.500">
                        Ficará 10 dias fora do trabalho
                    </Typography>
                </DefaultCard>
                <DefaultCard>
                    <Box display="flex" alignItems="center" gap="5px">
                        <AdjustOutlinedIcon
                            color="primary"
                            sx={{
                                fontSize: '0.75rem',
                            }}
                        />
                        <Typography fontSize="0.75rem" color="grey.500">
                            Dia 10 até dia 17
                        </Typography>
                    </Box>
                    <Typography fontWeight="medium">
                        Fulano de Tal estará de férias
                    </Typography>
                    <Typography fontSize="0.75rem" color="grey.500">
                        Ficará 10 dias fora do trabalho
                    </Typography>
                </DefaultCard>
            </Stack>
        </Box>
    )
}

export default CardEventosFuturos
