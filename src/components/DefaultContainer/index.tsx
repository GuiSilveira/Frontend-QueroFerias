import { Box } from '@mui/material'

type PropType = {
    children: JSX.Element[] | JSX.Element
}

const DefaultContainer = ({ children }: PropType) => {
    return (
        <Box
            sx={{
                backgroundColor: 'primary.main',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center',
                flexDirection: {
                    xs: 'column',
                },
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '40px',
                boxShadow: '0px 5px 10px 0px rgb(159, 159, 159)',
                overflow: 'hidden',
                minWidth: {
                    xs: 'calc(100% - 2rem)',
                    sm: '500px',
                },
                maxWidth: {
                    sm: '500px',
                },
            }}
        >
            {children}
        </Box>
    )
}

export default DefaultContainer
