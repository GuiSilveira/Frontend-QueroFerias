import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'
import { Button } from '@mui/material'

type PropTypes = {
    variant?: 'contained' | 'outlined'
    startIcon?: boolean
    type?: 'approve' | 'reject'
    children?: string
    size?: string
    onClick?: Function
}
const CustomButton = ({
    children,
    type,
    variant,
    startIcon,
    size,
    onClick,
}: PropTypes) => {
    return (
        <Button
            onClick={onClick ? () => onClick() : () => {}}
            variant={variant}
            startIcon={
                startIcon ? (
                    type === 'approve' ? (
                        <DoneIcon />
                    ) : (
                        <ClearIcon />
                    )
                ) : (
                    ''
                )
            }
            color={type === 'approve' ? 'primary' : 'warning'}
            sx={{
                color:
                    type === 'approve'
                        ? 'white'
                        : variant === 'outlined'
                        ? 'warning.main'
                        : 'white',
                minWidth: size ? 'auto' : '64px',
                width: size,
                height: size,
                borderRadius: size ? '10px' : '',
            }}
        >
            {children ? (
                children
            ) : type === 'approve' ? (
                <DoneIcon />
            ) : (
                <ClearIcon />
            )}
        </Button>
    )
}

export default CustomButton
