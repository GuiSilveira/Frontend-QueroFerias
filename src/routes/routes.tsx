import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage'
import FuncionarioSolicitacoes from '../pages/Funcionario/FuncionarioSolicitacoes'
import FuncionarioSolicitarFerias from '../pages/Funcionario/FuncionarioSolicitarFerias'
import GestorDashboard from '../pages/Gestor/GestorDashboard'
import GestorSolicitacoes from '../pages/Gestor/GestorSolicitacoes'
import GestorTime from '../pages/Gestor/GestorTime'
import Login, { loginAction } from '../pages/Login'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import Home from '../pages/Home'
import RootHome from '../pages/RootHome'
import Root from '../pages/Root'
import { checkAuthLoader } from '../util/auth'
import { logoutAction } from '../pages/Logout'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Login />,
                action: loginAction,
            },
            {
                path: 'logout',
                action: logoutAction,
            },
            {
                path: 'home',
                element: <RootHome />,
                loader: checkAuthLoader,
                id: 'rootHome',
                children: [
                    {
                        index: true,
                        element: <Home />,
                    },
                    {
                        path: 'register',
                        element: <Register />,
                    },
                    {
                        path: 'profile',
                        element: <Profile />,
                    },
                    {
                        path: 'solicitar',
                        element: (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <FuncionarioSolicitarFerias />
                            </LocalizationProvider>
                        ),
                    },
                    {
                        path: 'solicitacoes',
                        element: <FuncionarioSolicitacoes />,
                    },
                    {
                        path: 'gestor/dashboard',
                        element: <GestorDashboard />,
                    },
                    {
                        path: 'gestor/solicitacoes',
                        element: <GestorSolicitacoes />,
                    },
                    {
                        path: 'gestor/time',
                        element: <GestorTime />,
                    },
                ],
            },
        ],
    },
])

export default router
