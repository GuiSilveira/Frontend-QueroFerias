import { Box } from '@mui/material'
import Kalend, { CalendarView } from 'kalend'
import DefaultCard from '../../../../components/DefaultCard'
import DefaultTitle from '../../../../components/DefaultTitle'
import { CalendarEvent } from '../../../../types/types'

type CardCalendarioProps = {
    events: CalendarEvent[]
}

const CardCalendario = ({ events }: CardCalendarioProps) => {
    return (
        <Box>
            <DefaultTitle>Eventos Futuros</DefaultTitle>
            <DefaultCard
                width={{
                    xs: 'calc(100vw - 2rem)',
                    md: '100%',
                }}
            >
                <Box height={600}>
                    <Kalend
                        events={events}
                        initialDate={new Date().toISOString()}
                        timeFormat={'24'}
                        weekDayStart={'Monday'}
                        language={'ptBR'}
                        initialView={CalendarView.MONTH}
                    />
                </Box>
            </DefaultCard>
        </Box>
    )
}

export default CardCalendario
