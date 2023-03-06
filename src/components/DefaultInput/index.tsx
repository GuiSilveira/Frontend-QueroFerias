import { InputAdornment, TextField } from '@mui/material'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

type PropTypes = {
    focus: boolean
    setFocus: React.Dispatch<React.SetStateAction<boolean>>
    label: string
    placeholder: string
    type: string
}

const DefaultInput = ({
    focus,
    setFocus,
    label,
    placeholder,
    type,
}: PropTypes) => {
    return (
        <TextField
            label={label}
            InputLabelProps={{ shrink: true }}
            placeholder={placeholder}
            fullWidth
            required
            type={type}
            sx={{
                marginTop: '20px',
            }}
            onFocus={() => {
                setFocus(true)
            }}
            onBlur={() => {
                setFocus(!focus)
            }}
            InputProps={{
                endAdornment: focus ? (
                    <InputAdornment position="end">
                        <CancelOutlinedIcon />
                    </InputAdornment>
                ) : (
                    ''
                ),
            }}
        />
    )
}

export default DefaultInput
