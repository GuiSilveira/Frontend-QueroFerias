import { Select, FormControl, InputLabel } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

type PropTypes = {
    label: string
    labelId: string
    options: React.ReactNode[]
}

const DefaultSelect = ({ label, labelId, options }: PropTypes) => {
    return (
        <FormControl fullWidth>
            <InputLabel
                id={labelId}
                sx={{
                    marginTop: '20px',
                }}
            >
                {label}
            </InputLabel>
            <Select
                labelId={labelId}
                label={label}
                IconComponent={KeyboardArrowDownIcon}
                sx={{
                    marginTop: '20px',
                }}
            >
                {...options}
            </Select>
        </FormControl>
    )
}

export default DefaultSelect
