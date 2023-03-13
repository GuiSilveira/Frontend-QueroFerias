import {
    Avatar,
    Box,
    Card,
    Container,
    IconButton,
    InputBase,
    List,
    ListItemButton,
    Stack,
    Typography,
} from '@mui/material'
import DefaultTitle from '../../../components/DefaultTitle'
import Header from '../../../components/Header'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import CardBoldTitleWithStatus from '../../../components/CardBoldTitleWithStatus'
import DefaultCard from '../../../components/DefaultCard'
import CardBoldTitle from '../../../components/CardBoldTitle'
import CustomButton from '../../../components/CustomButton'
import DefaultModal from '../../../components/DefaultModal'

const GestorTime = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Box>
            <Header />
            <Container
                sx={{
                    marginTop: '93px',
                    marginBottom: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                }}
            >
                <Box>
                    <DefaultTitle>Adicione seus colegas de time</DefaultTitle>

                    <Box
                        component="form"
                        sx={{
                            backgroundColor: 'common.white',
                            color: 'common.black',
                            border: '1px solid',
                            borderColor: 'grey.500',
                            borderRadius: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            position: 'relative',
                        }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Pesquise um nome..."
                            type="search"
                            onChange={(event) => {
                                setSearchQuery(event.target.value)
                            }}
                        />
                        <IconButton
                            type="button"
                            sx={{ p: '10px' }}
                            aria-label="search"
                        >
                            <SearchIcon />
                        </IconButton>
                        {searchQuery && (
                            <Card
                                sx={{
                                    position: 'absolute',
                                    top: '105%',
                                    zIndex: 1,
                                    width: '100%',
                                    backgroundColor: 'primary.100',
                                }}
                            >
                                <List>
                                    <ListItemButton
                                        onClick={handleOpen}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            padding: '.5rem auto',
                                            cursor: 'pointer',
                                            ':hover': {
                                                backgroundColor:
                                                    'primary.darker',
                                            },
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                backgroundColor:
                                                    'primary.light',
                                                color: 'primary.main',
                                                width: 50,
                                                height: 50,
                                                fontSize: 20,
                                                fontWeight: 'medium',
                                            }}
                                        >
                                            F
                                        </Avatar>
                                        <Box>
                                            <CardBoldTitle>
                                                Fulano de Tal
                                            </CardBoldTitle>
                                            <Typography>
                                                Desenvolvedor Mobile
                                            </Typography>
                                        </Box>
                                    </ListItemButton>
                                </List>
                                <DefaultModal
                                    isOpen={open}
                                    closeModal={handleClose}
                                    handleApproval={handleClose}
                                    approveText="Adicionar"
                                    rejectText="Recusar"
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                backgroundColor:
                                                    'primary.light',
                                                color: 'primary.main',
                                                width: 50,
                                                height: 50,
                                                fontSize: 20,
                                                fontWeight: 'medium',
                                            }}
                                        >
                                            F
                                        </Avatar>
                                        <Box>
                                            <CardBoldTitle>
                                                Fulano de Tal
                                            </CardBoldTitle>
                                            <Typography>
                                                Desenvolvedor Mobile
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography
                                        sx={{
                                            marginTop: '.5rem',
                                            marginBottom: '1rem',
                                        }}
                                    >
                                        Você deseja adicionar essa pessoa ao seu
                                        time?
                                    </Typography>
                                </DefaultModal>
                            </Card>
                        )}
                    </Box>
                </Box>
                <Box>
                    <DefaultTitle>Seu time</DefaultTitle>
                    <Stack>
                        <DefaultCard>
                            <Box
                                display="flex"
                                flexDirection="row"
                                justifyContent="space-between"
                            >
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="1rem"
                                >
                                    <Avatar
                                        sx={{
                                            backgroundColor: 'primary.light',
                                            color: 'primary.main',
                                            width: 50,
                                            height: 50,
                                            fontSize: 20,
                                            fontWeight: 'medium',
                                        }}
                                    >
                                        F
                                    </Avatar>
                                    <Box>
                                        <CardBoldTitle>
                                            Fulano de Tal
                                        </CardBoldTitle>
                                        <Typography>
                                            Desenvolvedor Mobile
                                        </Typography>
                                        <CardBoldTitleWithStatus
                                            color={'primary'}
                                        >
                                            TRABALHANDO
                                        </CardBoldTitleWithStatus>
                                    </Box>
                                </Box>
                                <Box alignSelf="center">
                                    <CustomButton
                                        type="reject"
                                        variant="contained"
                                        size="35px"
                                    />
                                </Box>
                            </Box>
                        </DefaultCard>
                    </Stack>
                </Box>
            </Container>
        </Box>
    )
}

export default GestorTime
