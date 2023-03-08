import { FormControl, MenuItem, Select } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const DefaultFilter = () => {
    return (
        <FormControl sx={{ width: 150, backgroundColor: 'white' }}>
            <Select
                size="small"
                variant="outlined"
                defaultValue={'todas'}
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
