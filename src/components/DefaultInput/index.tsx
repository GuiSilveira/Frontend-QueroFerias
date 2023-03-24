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
    setChange?: React.Dispatch<React.SetStateAction<string>>
    name: string
}

const DefaultInput = ({
    focus,
    setFocus,
    label,
    placeholder,
    type,
    multiline,
    marginBottom,
    setChange,
    name,
}: PropTypes) => {
    return (
        <TextField
            name={name}
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
            onChange={(e) => {
                setChange?.(e.target.value)
            }}
        />
    )
}

export default DefaultInput
