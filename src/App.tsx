import Login from './pages/Login'
import Register from './pages/Register'
import FuncionarioSolicitarFerias from './pages/Funcionario/FuncionarioSolicitarFerias'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import FuncionarioSolicitacoes from './pages/Funcionario/FuncionarioSolicitacoes'

function App() {
    return (
        <Login />
        // <Register />
        // <LocalizationProvider dateAdapter={AdapterDayjs}>
        //     <FuncionarioSolicitarFerias />
        // </LocalizationProvider>
        // <FuncionarioSolicitacoes />
    )
}

export default App
