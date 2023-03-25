import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { ReactNode } from 'react'

type PropTypes = {
    value: string
    onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
}

const DefaultFilter = ({ value, onChange }: PropTypes) => {
    return (
        <FormControl sx={{ width: 150, backgroundColor: 'white' }}>
            <Select
                value={value}
                onChange={onChange}
                size="small"
                variant="outlined"
                IconComponent={KeyboardArrowDownIcon}
            >
                <MenuItem value="todas">Todas</MenuItem>
                <MenuItem value="pendentes">Pendentes</MenuItem>
                <MenuItem value="aprovadas">Aprovadas</MenuItem>
                <MenuItem value="reprovadas">Reprovadas</MenuItem>
            </Select>
        </FormControl>
    )
}

export default DefaultFilter
