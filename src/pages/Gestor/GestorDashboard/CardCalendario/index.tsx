import { Box } from '@mui/material'
import Kalend from 'kalend'
import DefaultCard from '../../../../components/DefaultCard'
import DefaultTitle from '../../../../components/DefaultTitle'

const CardCalendario = () => {
    return (
        <Box>
            <DefaultTitle>Eventos Futuros</DefaultTitle>
            <DefaultCard
                width={{
                    xs: 'calc(100vw - 2rem)',
                    md: '300px',
                    lg: '100%',
                }}
            >
                <Box height={600}>
                    <Kalend
                        events={[]}
                        initialDate={new Date().toISOString()}
                        hourHeight={60}
                        timeFormat={'24'}
                        weekDayStart={'Monday'}
                        calendarIDsHidden={['work']}
                        language={'ptBR'}
                    />
                </Box>
            </DefaultCard>
        </Box>
    )
}

export default CardCalendario
