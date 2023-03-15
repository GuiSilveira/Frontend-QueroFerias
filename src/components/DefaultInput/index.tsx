import { IconButton, InputAdornment, TextField } from '@mui/material'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

type PropTypes = {
    focus: boolean
    setFocus: React.Dispatch<React.SetStateAction<boolean>>
    label: string
    placeholder: string
    type: string
    multiline?: boolean
    marginBottom?: string | object
}

const DefaultInput = ({
    focus,
    setFocus,
    label,
    placeholder,
    type,
    multiline,
    marginBottom,
}: PropTypes) => {
    return (
        <TextField
            label={label}
            InputLabelProps={{ shrink: true }}
            placeholder={placeholder}
            fullWidth
            required
            multiline={multiline ? multiline : false}
            type={type}
            sx={{
                marginTop: '20px',
                marginBottom: marginBottom ? marginBottom : '',
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
