import { Container } from '@mui/material'

type PropType = {
    children: JSX.Element[]
}
const RoundedCornerContainer = ({ children }: PropType) => {
    return (
        <Container
            sx={{
                backgroundColor: 'white',
                width: '100%',
                borderRadius: '40px 40px 0 0',
                paddingTop: '3.8rem',
            }}
        >
            {...children}
        </Container>
    )
}

export default RoundedCornerContainer
