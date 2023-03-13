import { TextField } from '@mui/material'

const DefaultTextArea = () => {
    return (
        <TextField
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
