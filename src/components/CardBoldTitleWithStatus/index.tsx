import { Typography } from '@mui/material'
import CardBoldTitle from '../CardBoldTitle'

type PropTypes = {
    children: string
    color: 'primary' | 'warning' | 'grey.500'
}

const CardBoldTitleWithStatus = ({ children, color }: PropTypes) => {
    return (
        <CardBoldTitle
            sx={{
                alignSelf: 'flex-end',
            }}
        >
            Situação:{' '}
            <Typography
                component="span"
                fontWeight="bold"
                color={color}
                sx={{
                    display: 'inline-block',
                }}
            >
                {children.toUpperCase()}
            </Typography>
        </CardBoldTitle>
    )
}

export default CardBoldTitleWithStatus
