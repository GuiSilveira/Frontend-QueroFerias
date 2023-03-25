import { TextField } from '@mui/material'

type PropTypes = {
    name: string
}

const DefaultTextArea = ({ name }: PropTypes) => {
    return (
        <TextField
            name={name}
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
