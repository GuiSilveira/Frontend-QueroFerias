import { TextField } from '@mui/material'

type PropTypes = {
    name: string
    value?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const DefaultTextArea = ({ name, value, onChange }: PropTypes) => {
    return (
        <TextField
            name={name}
            value={value}
            onChange={onChange}
            label="Mensagem"
            placeholder="Digite aqui a sua mensagem..."
            multiline
            rows={3}
            fullWidth
            sx={{ marginTop: '20px' }}
            InputLabelProps={{
                shrink: true,
            }}
        />
    )
}

export default DefaultTextArea
