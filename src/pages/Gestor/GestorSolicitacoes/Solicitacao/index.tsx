import { ListItem, Stack, Box, Typography } from '@mui/material'
import CardBoldTitle from '../../../../components/CardBoldTitle'
import CardBoldTitleWithStatus from '../../../../components/CardBoldTitleWithStatus'
import CustomButton from '../../../../components/CustomButton'
import DefaultCard from '../../../../components/DefaultCard'
import api from '../../../../services/api'
import { EmployeeScheduleType, ScheduleType } from '../../../../types/types'
import axios from 'axios'

type SolicitacaoProps = {
    schedule: ScheduleType
    employee: EmployeeScheduleType
    handleOpen: (schedule: ScheduleType) => void
    setEmployeesWithSchedule: Function
    employeesWithSchedule: EmployeeScheduleType[]
}

function Solicitacao({
    schedule,
    employee,
    handleOpen,
    setEmployeesWithSchedule,
    employeesWithSchedule,
}: SolicitacaoProps) {
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
        >
            <DefaultCard
                width={'100%'}
                height={{
                    xs: 'auto',
                }}
            >
                <Stack flexDirection="column" justifyContent="space-between">
                    <Box marginBottom="1rem">
                        <CardBoldTitle>Colaborador</CardBoldTitle>
                        <Typography>{employee.name}</Typography>
                        <CardBoldTitle>Férias</CardBoldTitle>
                        <Typography>
                            {`De ${schedule.start.slice(0, 10)} até
                                                                ${schedule.end.slice(
                                                                    0,
                                                                    10
                                                                )}`}
                        </Typography>
                        <CardBoldTitle>Mensagem</CardBoldTitle>
                        <Typography>
                            {schedule.employeeComment
                                ? schedule.employeeComment
                                : 'Sem mensagem'}
                        </Typography>
                        <CardBoldTitleWithStatus
                            color={
                                schedule.status === 'Pending'
                                    ? 'grey.500'
                                    : schedule.status === 'Approved'
                                    ? 'primary'
                                    : 'warning.main'
                            }
                        >
                            {schedule.status === 'Pending'
                                ? 'Pendente'
                                : schedule.status === 'Approved'
                                ? 'Aprovado'
                                : 'Recusado'}
                        </CardBoldTitleWithStatus>
                    </Box>
                    {schedule.status === 'Pending' && (
                        <Stack flexDirection="row" gap="1rem" margin="auto">
                            <CustomButton
                                type="approve"
                                variant="contained"
                                startIcon={true}
                                onClick={async () => {
                                    const response = await api.patch(
                                        `/schedules/${schedule.id}`,
                                        {
                                            status: 'Approved',
                                        }
                                    )

                                    if (!response) {
                                        throw new Error('Erro ao aprovar')
                                    }

                                    const newEmployeesWithSchedule =
                                        employeesWithSchedule.map(
                                            (employee) => {
                                                if (
                                                    employee.id ===
                                                    schedule.idEmployee
                                                ) {
                                                    employee.schedules.map(
                                                        (employeeSchedule) => {
                                                            if (
                                                                schedule.id ===
                                                                employeeSchedule.id
                                                            ) {
                                                                employeeSchedule.status =
                                                                    'Approved'
                                                                console.log(
                                                                    employeeSchedule
                                                                )
                                                            }

                                                            return employeeSchedule
                                                        }
                                                    )
                                                }

                                                return employee
                                            }
                                        )

                                    setEmployeesWithSchedule(
                                        newEmployeesWithSchedule
                                    )

                                    if (response.data) {
                                        const emailResponse = await axios.post(
                                            'http://localhost:8000/enviar_mensagem',
                                            {
                                                email: {
                                                    assunto: `Aprovação de férias!`,
                                                    mensagem: `Olá, seu gestor aprovou suas férias de ${schedule.start.slice(
                                                        0,
                                                        10
                                                    )} até ${schedule.end.slice(
                                                        0,
                                                        10
                                                    )}`,
                                                    destinatario:
                                                        'guisilveira.cout@gmail.com',
                                                },
                                                msgWorkplace: {
                                                    id: 100089487301073,
                                                    mensagem: `Aprovação de férias! Olá, seu gestor aprovou suas férias de ${schedule.start.slice(
                                                        0,
                                                        10
                                                    )} até ${schedule.end.slice(
                                                        0,
                                                        10
                                                    )}`,
                                                },
                                            }
                                        )

                                        if (!emailResponse) {
                                            throw new Error(
                                                'Erro ao enviar email'
                                            )
                                        }

                                        console.log(emailResponse.data)
                                    }
                                }}
                            >
                                Aceitar
                            </CustomButton>
                            <CustomButton
                                type="reject"
                                startIcon={true}
                                variant="outlined"
                                onClick={() => handleOpen(schedule)}
                            >
                                Recusar
                            </CustomButton>
                        </Stack>
                    )}
                </Stack>
            </DefaultCard>
        </ListItem>
    )
}

export default Solicitacao
