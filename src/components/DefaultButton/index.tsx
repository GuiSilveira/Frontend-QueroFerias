import { useTheme } from '@mui/material/styles'
import { Button } from '@mui/material'

type PropTypes = {
    content: string
    small?: boolean
    onClick?: () => void
    type?: 'submit' | 'reset' | 'button'
    disable?: boolean
}

const DefaultButton = ({
    content,
    small,
    onClick,
    type,
    disable,
}: PropTypes) => {
    const theme = useTheme()

    return (
        <Button
            disabled={disable}
            variant="outlined"
            onClick={onClick}
            sx={{
                borderRadius: '40px',
                border: 'none',
                color: `${theme.palette.common.white}`,
                backgroundColor: disable
                    ? `${theme.palette.grey[400]}`
                    : `${theme.palette.primary.main}`,
                width: '100%',
                marginTop: '1rem',
                padding: `${small ? '0.5rem' : '1rem 0 1rem 0'}`,
                ':hover': {
                    backgroundColor: `${theme.palette.primary.dark}`,
                },
                transition: 'all ease-in-out 0.3s',
            }}
            type={type}
        >
            {content}
        </Button>
    )
}

export default DefaultButton
