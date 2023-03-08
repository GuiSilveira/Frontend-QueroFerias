import { Typography, useTheme } from '@mui/material'

type PropTypes = {
    children: string
    sx: object
}

const DefaultTitle = ({ children, sx }: PropTypes) => {
    const theme = useTheme()
    return (
        <Typography fontSize="1.375rem" fontWeight="bold" sx={sx}>
            {children}
        </Typography>
    )
}

export default DefaultTitle
