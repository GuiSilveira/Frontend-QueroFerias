import { Container } from '@mui/material'

type PropType = {
    children: JSX.Element[] | JSX.Element
}

const RoundedCornerContainer = ({ children }: PropType) => {
    return (
        <Container
            sx={{
                backgroundColor: 'white',
                width: '100%',
                borderRadius: '40px',
                paddingTop: '2rem',
                paddingBottom: '2rem',
            }}
        >
            {children}
        </Container>
    )
}

export default RoundedCornerContainer
