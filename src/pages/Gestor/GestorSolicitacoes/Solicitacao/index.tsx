import { ListItem, Stack, Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CardBoldTitle from '../../../../components/CardBoldTitle'
import CardBoldTitleWithStatus from '../../../../components/CardBoldTitleWithStatus'
import CustomButton from '../../../../components/CustomButton'
import DefaultCard from '../../../../components/DefaultCard'
import api from '../../../../services/api'
import { EmployeeScheduleType, ScheduleType } from '../../../../types/types'

type SolicitacaoProps = {
    schedule: ScheduleType
    employee: EmployeeScheduleType
    handleOpen: () => void
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
                            {schedule.status}
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
                                }}
                            >
                                Aceitar
                            </CustomButton>
                            <CustomButton
                                type="reject"
                                startIcon={true}
                                variant="outlined"
                                onClick={() => handleOpen()}
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
