import { Container } from '@mui/material'

type PropType = {
    children: JSX.Element[] | JSX.Element
    paddingTop?: string
}

const RoundedCornerContainer = ({ children, paddingTop }: PropType) => {
    return (
        <Container
            sx={{
                backgroundColor: 'white',
                width: '100%',
                borderRadius: '40px',
                paddingTop: paddingTop ? paddingTop : '5rem',
                paddingBottom: '2rem',
            }}
        >
            {children}
        </Container>
    )
}

export default RoundedCornerContainer
