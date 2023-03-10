import { Box, Stack, Typography } from '@mui/material'
import DefaultCard from '../../../../components/DefaultCard'
import DefaultTitle from '../../../../components/DefaultTitle'
import { DonutChart, AreaChart } from '@tremor/react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

const funcionariosFerias = [
    {
        name: 'Trabalhando',
        quantidade: 55,
    },
    {
        name: 'Férias',
        quantidade: 35,
    },
]

const chartdata = [
    {
        date: 'Jan',
        Trabalhando: 2890,
        'De Férias': 2338,
    },
    {
        date: 'Feb',
        Trabalhando: 2756,
        'De Férias': 2103,
    },
    {
        date: 'Mar',
        Trabalhando: 3322,
        'De Férias': 2194,
    },
    {
        date: 'Apr',
        Trabalhando: 3470,
        'De Férias': 2108,
    },
    {
        date: 'May',
        Trabalhando: 3475,
        'De Férias': 1812,
    },
    {
        date: 'Jun',
        Trabalhando: 3129,
        'De Férias': 1726,
    },
]

const CardTime = () => {
    return (
        <Box>
            <DefaultTitle>Seu Time</DefaultTitle>
            <Stack gap="1rem">
                <DefaultCard>
                    <Typography
                        marginBottom="1.5rem"
                        marginLeft="2.625rem"
                        fontWeight="bold"
                        color="grey.600"
                    >
                        Trabalhando x Férias
                    </Typography>
                    <DonutChart
                        data={funcionariosFerias}
                        category="quantidade"
                        dataKey="name"
                        colors={['green', 'red']}
                    />
                    <Stack gap="0.5rem" margin="1rem 2.625rem 0">
                        <Stack
                            flexDirection="row"
                            justifyContent="space-between"
                        >
                            <Stack
                                flexDirection="row"
                                alignItems="center"
                                gap="12px"
                            >
                                <Box
                                    borderRadius={50}
                                    width={16}
                                    height={16}
                                    sx={{
                                        backgroundColor: '#22c55e',
                                    }}
                                />
                                <Typography>Trabalhando</Typography>
                            </Stack>
                            <Stack
                                flexDirection="row"
                                alignItems="center"
                                gap="12px"
                            >
                                <Typography>30</Typography>
                                <ArrowUpwardIcon
                                    color="primary"
                                    fontSize="small"
                                />
                            </Stack>
                        </Stack>
                        <Stack
                            flexDirection="row"
                            justifyContent="space-between"
                        >
                            <Stack
                                flexDirection="row"
                                alignItems="center"
                                gap="12px"
                            >
                                <Box
                                    borderRadius={50}
                                    width={16}
                                    height={16}
                                    sx={{
                                        backgroundColor: '#ef4444',
                                    }}
                                />
                                <Typography>De Férias</Typography>
                            </Stack>
                            <Stack
                                flexDirection="row"
                                alignItems="center"
                                gap="12px"
                            >
                                <Typography>26</Typography>
                                <ArrowUpwardIcon
                                    color="warning"
                                    fontSize="small"
                                    sx={{
                                        transform: 'rotate(180deg)',
                                    }}
                                />
                            </Stack>
                        </Stack>
                    </Stack>
                </DefaultCard>
                <DefaultCard>
                    <Typography
                        marginBottom="1.5rem"
                        textAlign="center"
                        fontWeight="bold"
                        color="grey.600"
                    >
                        Funcionários de férias por mês
                    </Typography>
                    <AreaChart
                        data={chartdata}
                        categories={['Trabalhando', 'De Férias']}
                        dataKey="date"
                        colors={['green', 'red']}
                    />
                </DefaultCard>
            </Stack>
        </Box>
    )
}

export default CardTime
