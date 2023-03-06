import { Box } from '@mui/material'

type PropType = {
    children: JSX.Element[]
}

const DefaultContainer = ({ children }: PropType) => {
    return (
        <Box
            sx={{
                backgroundColor: '#27AE60',
                color: 'white',
                textAlign: 'center',
            }}
        >
            {...children}
        </Box>
    )
}

export default DefaultContainer
