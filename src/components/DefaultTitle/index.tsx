import { Typography } from '@mui/material'

type PropTypes = {
    children: string
    sx?: object
}

const DefaultTitle = ({ children, sx }: PropTypes) => {
    return (
        <Typography fontSize="1.375rem" fontWeight="bold" sx={sx}>
            {children}
        </Typography>
    )
}

export default DefaultTitle
