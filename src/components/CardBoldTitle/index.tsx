import { Typography } from '@mui/material'

type PropTypes = {
    children: string | React.ReactNode[]
    sx?: object
}

const CardBoldTitle = ({ children, sx }: PropTypes) => {
    return (
        <Typography fontWeight="bold" sx={sx}>
            {children}
        </Typography>
    )
}

export default CardBoldTitle
