import router from './routes/routes'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { RouterProvider } from 'react-router-dom'
import theme from './theme'

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}

export default App
