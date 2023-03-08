import { useTheme } from '@mui/material/styles'
import { Button } from '@mui/material'

type PropTypes = {
    content: string
    small?: boolean
}

const DefaultButton = ({ content, small }: PropTypes) => {
    const theme = useTheme()

    return (
        <Button
            variant="outlined"
            sx={{
                borderRadius: '40px',
                border: 'none',
                color: `${theme.palette.common.white}`,
                backgroundColor: `${theme.palette.primary.main}`,
                width: '100%',
                marginTop: '1rem',
                padding: `${small ? '0.5rem' : '1rem 0 1rem 0'}`,
                ':hover': {
                    backgroundColor: `${theme.palette.primary.dark}`,
                },
                transition: 'all ease-in-out 0.3s',
            }}
        >
            {content}
        </Button>
    )
}

export default DefaultButton
