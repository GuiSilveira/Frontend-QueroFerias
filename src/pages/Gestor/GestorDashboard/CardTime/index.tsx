import {
    Box,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material'
import DefaultCard from '../../../../components/DefaultCard'
import DefaultTitle from '../../../../components/DefaultTitle'
import { DonutChart, AreaChart } from '@tremor/react'
import { ScheduleType } from '../../../../types/types'
import dayjs from 'dayjs'
import axios from 'axios'
import SaveIcon from '@mui/icons-material/Save'
import PrintIcon from '@mui/icons-material/Print'
import { saveAs } from 'file-saver'

type CardTimeProps = {
    employeesOnVacation: any[]
    employeesWorking: any[]
    employeesDelayed: any[]
    schedulesInCurrentYear: ScheduleType[]
    employeesCount: number
}

const actions = [
    {
        icon: <SaveIcon />,
        name: 'RelatorioFuncionarios',
        title: 'Baixar Relatório de Funcionários de Férias no Momento',
    },
    {
        icon: <PrintIcon />,
        name: 'RelatorioFeriasMes',
        title: 'Baixar Relatório de Férias x Mês',
    },
]

const CardTime = ({
    employeesOnVacation,
    employeesWorking,
    employeesDelayed,
    employeesCount,
    schedulesInCurrentYear,
}: CardTimeProps) => {
    const funcionariosFerias = [
        {
            name: 'Trabalhando',
            quantidade: employeesWorking.length,
        },
        {
            name: 'Férias',
            quantidade: employeesOnVacation.length,
        },
        {
            name: 'Atrasados',
            quantidade: employeesDelayed.length,
        },
    ]

    const feriasMes = {
        jan: 0,
        fev: 0,
        mar: 0,
        abr: 0,
        mai: 0,
        jun: 0,
        jul: 0,
        ago: 0,
        set: 0,
        out: 0,
        nov: 0,
        dez: 0,
    }

    console.log('Working: ', employeesWorking)
    console.log('Vacation: ', employeesOnVacation)
    console.log('Delayed: ', employeesDelayed)

    const employeesStatusData = [
        ...employeesWorking,
        ...employeesOnVacation,
        ...employeesDelayed,
    ]

    const employeesStatusForDownload = employeesStatusData.map((employee) => {
        return {
            name: employee.name,
            vacationStatus:
                employee.vacationStatus === 'Delayed'
                    ? 'Atrasado'
                    : employee.vacationStatus === 'Working'
                    ? 'Trabalhando'
                    : 'Férias',
            credential: employee.credential,
            role: employee.role,
            contract: employee.contract,
        }
    })

    schedulesInCurrentYear.map((schedule) => {
        if (dayjs(schedule.start).month() === 0) {
            feriasMes.jan += 1
        }

        if (dayjs(schedule.start).month() === 1) {
            feriasMes.fev += 1
        }

        if (dayjs(schedule.start).month() === 2) {
            feriasMes.mar += 1
        }

        if (dayjs(schedule.start).month() === 3) {
            feriasMes.abr += 1
        }

        if (dayjs(schedule.start).month() === 4) {
            feriasMes.mai += 1
        }

        if (dayjs(schedule.start).month() === 5) {
            feriasMes.jun += 1
        }

        if (dayjs(schedule.start).month() === 6) {
            feriasMes.jul += 1
        }

        if (dayjs(schedule.start).month() === 7) {
            feriasMes.ago += 1
        }

        if (dayjs(schedule.start).month() === 8) {
            feriasMes.set += 1
        }

        if (dayjs(schedule.start).month() === 9) {
            feriasMes.out += 1
        }

        if (dayjs(schedule.start).month() === 10) {
            feriasMes.nov += 1
        }

        if (dayjs(schedule.start).month() === 11) {
            feriasMes.dez += 1
        }
    })

    const chartdata = [
        {
            date: 'Jan',
            Trabalhando: employeesCount - feriasMes['jan'],
            DeFerias: feriasMes['jan'],
        },
        {
            date: 'Fev',
            Trabalhando: employeesCount - feriasMes['fev'],
            DeFerias: feriasMes['fev'],
        },
        {
            date: 'Mar',
            Trabalhando: employeesCount - feriasMes['mar'],
            DeFerias: feriasMes['mar'],
        },
        {
            date: 'Abr',
            Trabalhando: employeesCount - feriasMes['abr'],
            DeFerias: feriasMes['abr'],
        },
        {
            date: 'Mai',
            Trabalhando: employeesCount - feriasMes['mai'],
            DeFerias: feriasMes['mai'],
        },
        {
            date: 'Jun',
            Trabalhando: employeesCount - feriasMes['jun'],
            DeFerias: feriasMes['jun'],
        },
        {
            date: 'Jul',
            Trabalhando: employeesCount - feriasMes['jul'],
            DeFerias: feriasMes['jul'],
        },
        {
            date: 'Ago',
            Trabalhando: employeesCount - feriasMes['ago'],
            DeFerias: feriasMes['ago'],
        },
        {
            date: 'Set',
            Trabalhando: employeesCount - feriasMes['set'],
            DeFerias: feriasMes['set'],
        },
        {
            date: 'Out',
            Trabalhando: employeesCount - feriasMes['out'],
            DeFerias: feriasMes['out'],
        },
        {
            date: 'Nov',
            Trabalhando: employeesCount - feriasMes['nov'],
            DeFerias: feriasMes['nov'],
        },
        {
            date: 'Dez',
            Trabalhando: employeesCount - feriasMes['dez'],
            DeFerias: feriasMes['dez'],
        },
    ]

    return (
        <Box>
            <DefaultTitle>Seu Time</DefaultTitle>
            <Stack gap="1rem">
                <DefaultCard
                    width={{
                        xs: 'calc(100vw - 2rem)',
                        md: '300px',
                        lg: '100%',
                    }}
                >
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
                        colors={['green', 'red', 'slate']}
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
                                <Typography>
                                    {employeesWorking.length}
                                </Typography>
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
                                <Typography>
                                    {employeesOnVacation.length}
                                </Typography>
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
                                        backgroundColor: '#b1b1b1',
                                    }}
                                />
                                <Typography>Atrasados</Typography>
                            </Stack>
                            <Stack
                                flexDirection="row"
                                alignItems="center"
                                gap="12px"
                            >
                                <Typography>
                                    {employeesDelayed.length}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </DefaultCard>
                <DefaultCard
                    width={{
                        xs: 'calc(100vw - 2rem)',
                        md: '300px',
                        lg: '100%',
                    }}
                >
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
                        categories={['Trabalhando', 'DeFerias']}
                        dataKey="date"
                        colors={['green', 'red']}
                    />
                </DefaultCard>
            </Stack>
            <Tooltip title={'Gerar Relatórios'} placement="left-end">
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.title}
                            onClick={async () => {
                                const data =
                                    action.name === 'RelatorioFeriasMes'
                                        ? chartdata
                                        : employeesStatusForDownload
                                const type =
                                    action.name === 'RelatorioFeriasMes'
                                        ? 'relatorioFerias'
                                        : 'relatorioFuncionarios'

                                const url =
                                    action.name === 'RelatorioFeriasMes'
                                        ? 'gerar_relatorio'
                                        : 'gerar_relatorio_funcionarios'

                                const response = await axios.post(
                                    `http://localhost:8000/${url}`,
                                    data
                                )

                                if (response.status === 200) {
                                    const downloadExcelFile = () => {
                                        axios({
                                            url: 'http://localhost:8000/download',
                                            method: 'GET',
                                            responseType: 'blob',
                                            params: {
                                                relatorio: type,
                                            },
                                        }).then((response) => {
                                            console.log(response)

                                            const file = new File(
                                                [response.data],
                                                `${type}.xlsx`,
                                                {
                                                    type: 'application/vnd.ms-excel',
                                                }
                                            )
                                            saveAs(file)
                                        })
                                    }

                                    downloadExcelFile()

                                    const responseEmail = await axios.post(
                                        `http://127.0.0.1:8000/enviar_mensagem`,
                                        {
                                            email: {
                                                assunto: `Relatório`,
                                                mensagem: `Aqui está seu relatório de ${
                                                    action.name ===
                                                    'RelatorioFeriasMes'
                                                        ? 'férias x mês'
                                                        : 'funcionários'
                                                }`,
                                                destinatario:
                                                    'guisilveira.cout@gmail.com',
                                                relatorio: type,
                                            },
                                            msgWorkplace: {
                                                id: 100089487301073,
                                                mensagem: `Um relatório de ${
                                                    action.name ===
                                                    'RelatorioFeriasMes'
                                                        ? 'férias x mês'
                                                        : 'funcionários'
                                                } foi enviado para seu email`,
                                            },
                                        }
                                    )

                                    console.log(responseEmail)
                                }
                            }}
                        />
                    ))}
                </SpeedDial>
            </Tooltip>
        </Box>
    )
}

export default CardTime
