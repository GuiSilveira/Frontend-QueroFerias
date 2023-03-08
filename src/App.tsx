import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import DefaultCard from './components/DefaultCard'
import FuncionarioSolicitarFerias from './pages/Funcionario/FuncionarioSolicitarFerias'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App({ children }: any) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FuncionarioSolicitarFerias />
        </LocalizationProvider>
    )
}

export default App
