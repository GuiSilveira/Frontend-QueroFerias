import createTheme from '@mui/material/styles/createTheme'

const theme = createTheme({
    palette: {
        background: {
            default: '#F2F2F2',
        },
        text: {
            primary: '#1E1E1E',
        },
        grey: {
            '400': '#F2F2F2',
        },
        primary: {
            main: '#27AE60',
            light: '#6FCF97',
            dark: '#219653',
        },
        secondary: {
            main: '#FFD542',
            dark: '#9C7A00',
        },
        warning: {
            main: '#FF5252',
        },
    },
})

export default theme
