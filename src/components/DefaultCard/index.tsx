import { useTheme } from '@mui/material/styles'
import { Card, CardContent } from '@mui/material'

type PropType = {
    children: JSX.Element[] | JSX.Element
    maxWidth?: string | object
    minWidth?: string | object
    width?: string | object
    height?: string | object
    paddingBottom?: string
}

const DefaultCard = ({
    children,
    maxWidth,
    minWidth,
    width,
    height,
    paddingBottom,
}: PropType) => {
    const theme = useTheme()
    return (
        <Card
            sx={{
                backgroundColor: `${theme.palette.common.white}`,
                borderRadius: '5px',
                boxShadow: `0px 4px 4px rgba(0,0,0,0.25)`,
                width: width
                    ? width
                    : { xs: 'calc(100vw - 2rem)', md: '300px', lg: '30%' },
                minWidth: minWidth ? minWidth : '0',
                maxWidth: maxWidth ? maxWidth : '100%',
                height: height ? height : 'auto',
                paddingBottom: paddingBottom ? paddingBottom : '1rem',
            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                {children}
            </CardContent>
        </Card>
    )
}

export default DefaultCard
