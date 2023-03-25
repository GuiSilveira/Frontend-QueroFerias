import {
    Select,
    FormControl,
    InputLabel,
    SelectChangeEvent,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { ReactNode } from 'react'

type PropTypes = {
    label: string
    labelId: string
    children: JSX.Element[] | JSX.Element
    name: string
    value: string
    onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
}

const DefaultSelect = ({
    label,
    labelId,
    children,
    name,
    value,
    onChange,
}: PropTypes) => {
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
                name={name}
                value={value}
                onChange={onChange}
                sx={{
                    marginTop: '20px',
                }}
            >
                {children}
            </Select>
        </FormControl>
    )
}

export default DefaultSelect
