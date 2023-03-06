import { Typography, useTheme } from '@mui/material'

type PropTypes = {
    children: string
}

const DefaultTitle = ({ children }: PropTypes) => {
    const theme = useTheme()
    return (
        <Typography
            fontSize="1.375rem"
            fontWeight="bold"
            sx={{
                color: `${theme.palette.text.primary}`,
            }}
        >
            {children}
        </Typography>
    )
}

export default DefaultTitle
