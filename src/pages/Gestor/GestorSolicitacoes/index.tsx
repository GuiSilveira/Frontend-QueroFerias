import {
    Box,
    Container,
    List,
    ListItem,
    SelectChangeEvent,
    Stack,
    Typography,
} from '@mui/material'
import CardBoldTitle from '../../../components/CardBoldTitle'
import DefaultCard from '../../../components/DefaultCard'
import DefaultFilter from '../../../components/DefaultFilter'
import DefaultTitle from '../../../components/DefaultTitle'
import CardBoldTitleWithStatus from '../../../components/CardBoldTitleWithStatus'
import CustomButton from '../../../components/CustomButton'
import { useEffect, useState } from 'react'
import DefaultModal from '../../../components/DefaultModal'
import DefaultTextArea from '../../../components/DefaultTextArea'
import { useUserDataStore } from '../../../store/useUserData'
import { getAuthToken } from '../../../util/auth'
import api from '../../../services/api'

const GestorSolicitacoes = () => {
    const [open, setOpen] = useState(false)
    const token = getAuthToken()
    const [mensagemGestor, setMensagemGestor] = useState<string | null>(null)
    const [filter, setFilter] = useState<string>('Todas')
    const userData = useUserDataStore((state: any) => state.userData)
    const [employeesWithSchedules, setEmployeesWithSchedules] = useState<any>(
        []
    )

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (userData.id) {
            ;(async () => {
                const response = await api.get(
                    `/employees/manager/${userData.id}/schedules/all`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                const filteredEmployeeSchedules = response.data.filter(
                    (employee: any) => {
                        return employee.schedules.length > 0
                    }
                )
                setEmployeesWithSchedules(filteredEmployeeSchedules)
            })()
        }
    }, [userData])

    if (!userData.id) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <Typography variant="h4">Carregando...</Typography>
            </Box>
        )
    }

    return (
        <Box>
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
                    marginTop: '71px',
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
                <DefaultTitle>Solicitações</DefaultTitle>
                <DefaultFilter
                    value={filter}
                    onChange={(event: SelectChangeEvent) => {
                        setFilter(event.target.value as string)
                    }}
                />
                <List
                    sx={{
                        display: 'flex',
                        flexDirection: {
                            xs: 'column',
                            md: 'row',
                        },
                        gap: '1rem',
                        flexWrap: 'wrap',
                        paddingRight: '1rem',
                        paddingBottom: '1rem',
                    }}
                >
                    {employeesWithSchedules.map((employee: any) => {
                        return employee.schedules.map((schedule: any) => {
                            if (filter === 'Todas') {
                                return (
                                    <ListItem
                                        sx={{
                                            padding: '0',
                                            width: {
                                                xs: '100%',
                                                md: '45%',
                                                lg: '30%',
                                            },
                                        }}
                                        key={schedule.id}
                                    >
                                        <DefaultCard
                                            width={'100%'}
                                            height={{
                                                xs: 'auto',
                                            }}
                                        >
                                            <Stack
                                                flexDirection="column"
                                                justifyContent="space-between"
                                            >
                                                <Box marginBottom="1rem">
                                                    <CardBoldTitle>
                                                        Colaborador
                                                    </CardBoldTitle>
                                                    <Typography>
                                                        {employee.name}
                                                    </Typography>
                                                    <CardBoldTitle>
                                                        Férias
                                                    </CardBoldTitle>
                                                    <Typography>
                                                        {`De ${schedule.start.slice(
                                                            0,
                                                            10
                                                        )} até
                                                            ${schedule.end.slice(
                                                                0,
                                                                10
                                                            )}`}
                                                    </Typography>
                                                    <CardBoldTitle>
                                                        Mensagem
                                                    </CardBoldTitle>
                                                    <Typography>
                                                        {schedule.employeeComment
                                                            ? schedule.employeeComment
                                                            : 'Sem mensagem'}
                                                    </Typography>
                                                    <CardBoldTitleWithStatus
                                                        color={
                                                            schedule.status ===
                                                            'Pending'
                                                                ? 'grey.500'
                                                                : schedule.status ===
                                                                  'Approved'
                                                                ? 'primary'
                                                                : 'warning.main'
                                                        }
                                                    >
                                                        {schedule.status}
                                                    </CardBoldTitleWithStatus>
                                                </Box>
                                                {schedule.status ===
                                                    'Pending' && (
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
                                                )}
                                            </Stack>
                                        </DefaultCard>
                                    </ListItem>
                                )
                            } else if (filter === 'Aprovadas') {
                                return (
                                    schedule.status === 'Approved' && (
                                        <ListItem
                                            sx={{
                                                padding: '0',
                                                width: {
                                                    xs: '100%',
                                                    md: '45%',
                                                    lg: '30%',
                                                },
                                            }}
                                            key={schedule.id}
                                        >
                                            <DefaultCard
                                                width={'100%'}
                                                height={{
                                                    xs: 'auto',
                                                }}
                                            >
                                                <Stack
                                                    flexDirection="column"
                                                    justifyContent="space-between"
                                                >
                                                    <Box marginBottom="1rem">
                                                        <CardBoldTitle>
                                                            Colaborador
                                                        </CardBoldTitle>
                                                        <Typography>
                                                            {employee.name}
                                                        </Typography>
                                                        <CardBoldTitle>
                                                            Férias
                                                        </CardBoldTitle>
                                                        <Typography>
                                                            {`De ${schedule.start.slice(
                                                                0,
                                                                10
                                                            )} até
                                                                ${schedule.end.slice(
                                                                    0,
                                                                    10
                                                                )}`}
                                                        </Typography>
                                                        <CardBoldTitle>
                                                            Mensagem
                                                        </CardBoldTitle>
                                                        <Typography>
                                                            {schedule.employeeComment
                                                                ? schedule.employeeComment
                                                                : 'Sem mensagem'}
                                                        </Typography>
                                                        <CardBoldTitleWithStatus
                                                            color={
                                                                schedule.status ===
                                                                'Pending'
                                                                    ? 'grey.500'
                                                                    : schedule.status ===
                                                                      'Approved'
                                                                    ? 'primary'
                                                                    : 'warning.main'
                                                            }
                                                        >
                                                            {schedule.status}
                                                        </CardBoldTitleWithStatus>
                                                    </Box>
                                                    {schedule.status ===
                                                        'Pending' && (
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
                                                                onClick={
                                                                    handleOpen
                                                                }
                                                            >
                                                                Recusar
                                                            </CustomButton>
                                                        </Stack>
                                                    )}
                                                </Stack>
                                            </DefaultCard>
                                        </ListItem>
                                    )
                                )
                            } else if (filter === 'Reprovadas') {
                                return (
                                    schedule.status === 'Rejected' && (
                                        <ListItem
                                            sx={{
                                                padding: '0',
                                                width: {
                                                    xs: '100%',
                                                    md: '45%',
                                                    lg: '30%',
                                                },
                                            }}
                                            key={schedule.id}
                                        >
                                            <DefaultCard
                                                width={'100%'}
                                                height={{
                                                    xs: 'auto',
                                                }}
                                            >
                                                <Stack
                                                    flexDirection="column"
                                                    justifyContent="space-between"
                                                >
                                                    <Box marginBottom="1rem">
                                                        <CardBoldTitle>
                                                            Colaborador
                                                        </CardBoldTitle>
                                                        <Typography>
                                                            {employee.name}
                                                        </Typography>
                                                        <CardBoldTitle>
                                                            Férias
                                                        </CardBoldTitle>
                                                        <Typography>
                                                            {`De ${schedule.start.slice(
                                                                0,
                                                                10
                                                            )} até
                                                                ${schedule.end.slice(
                                                                    0,
                                                                    10
                                                                )}`}
                                                        </Typography>
                                                        <CardBoldTitle>
                                                            Mensagem
                                                        </CardBoldTitle>
                                                        <Typography>
                                                            {schedule.employeeComment
                                                                ? schedule.employeeComment
                                                                : 'Sem mensagem'}
                                                        </Typography>
                                                        <CardBoldTitleWithStatus
                                                            color={
                                                                schedule.status ===
                                                                'Pending'
                                                                    ? 'grey.500'
                                                                    : schedule.status ===
                                                                      'Approved'
                                                                    ? 'primary'
                                                                    : 'warning.main'
                                                            }
                                                        >
                                                            {schedule.status}
                                                        </CardBoldTitleWithStatus>
                                                    </Box>
                                                    {schedule.status ===
                                                        'Pending' && (
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
                                                                onClick={
                                                                    handleOpen
                                                                }
                                                            >
                                                                Recusar
                                                            </CustomButton>
                                                        </Stack>
                                                    )}
                                                </Stack>
                                            </DefaultCard>
                                        </ListItem>
                                    )
                                )
                            } else if (filter === 'Pendentes') {
                                return (
                                    schedule.status === 'Pending' && (
                                        <ListItem
                                            sx={{
                                                padding: '0',
                                                width: {
                                                    xs: '100%',
                                                    md: '45%',
                                                    lg: '30%',
                                                },
                                            }}
                                            key={schedule.id}
                                        >
                                            <DefaultCard
                                                width={'100%'}
                                                height={{
                                                    xs: 'auto',
                                                }}
                                            >
                                                <Stack
                                                    flexDirection="column"
                                                    justifyContent="space-between"
                                                >
                                                    <Box marginBottom="1rem">
                                                        <CardBoldTitle>
                                                            Colaborador
                                                        </CardBoldTitle>
                                                        <Typography>
                                                            {employee.name}
                                                        </Typography>
                                                        <CardBoldTitle>
                                                            Férias
                                                        </CardBoldTitle>
                                                        <Typography>
                                                            {`De ${schedule.start.slice(
                                                                0,
                                                                10
                                                            )} até
                                                                ${schedule.end.slice(
                                                                    0,
                                                                    10
                                                                )}`}
                                                        </Typography>
                                                        <CardBoldTitle>
                                                            Mensagem
                                                        </CardBoldTitle>
                                                        <Typography>
                                                            {schedule.employeeComment
                                                                ? schedule.employeeComment
                                                                : 'Sem mensagem'}
                                                        </Typography>
                                                        <CardBoldTitleWithStatus
                                                            color={
                                                                schedule.status ===
                                                                'Pending'
                                                                    ? 'grey.500'
                                                                    : schedule.status ===
                                                                      'Approved'
                                                                    ? 'primary'
                                                                    : 'warning.main'
                                                            }
                                                        >
                                                            {schedule.status}
                                                        </CardBoldTitleWithStatus>
                                                    </Box>
                                                    {schedule.status ===
                                                        'Pending' && (
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
                                                                onClick={
                                                                    handleOpen
                                                                }
                                                            >
                                                                Recusar
                                                            </CustomButton>
                                                        </Stack>
                                                    )}
                                                </Stack>
                                            </DefaultCard>
                                        </ListItem>
                                    )
                                )
                            }
                        })
                    })}
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
                        <DefaultTextArea
                            name="mensagemGestor"
                            value={mensagemGestor ? mensagemGestor : ''}
                            onChange={(event) => {
                                setMensagemGestor(event?.target.value)
                            }}
                        />
                    </Box>
                </DefaultModal>
            </Container>
        </Box>
    )
}

export default GestorSolicitacoes
