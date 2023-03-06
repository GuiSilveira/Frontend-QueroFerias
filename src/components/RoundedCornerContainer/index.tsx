import { Container } from '@mui/material'

type PropType = {
    paddingTop: string
    children: JSX.Element[]
}
const RoundedCornerContainer = ({ paddingTop, children }: PropType) => {
    return (
        <Container
            sx={{
                backgroundColor: 'white',
                width: '100%',
                borderRadius: '40px 40px 0 0',
                paddingTop: { paddingTop },
            }}
        >
            {...children}
        </Container>
    )
}

export default RoundedCornerContainer
