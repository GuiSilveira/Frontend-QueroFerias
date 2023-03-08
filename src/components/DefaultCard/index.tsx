import { useTheme } from '@mui/material/styles'
import { Card, CardContent } from '@mui/material'

type PropType = {
    children: JSX.Element[]
}

const DefaultCard = ({ children }: PropType) => {
    const theme = useTheme()
    return (
        <Card
            sx={{
                backgroundColor: `${theme.palette.common.white}`,
                borderRadius: '5px',
                boxShadow: `0px 4px 4px rgba(0,0,0,0.25)`,
                width: '100%',
            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                {...children}
            </CardContent>
        </Card>
    )
}

export default DefaultCard
