import {
    Alert,
    AlertColor,
    Avatar,
    Box,
    CircularProgress,
    Container,
    List,
    ListItem,
    Snackbar,
    Typography,
} from '@mui/material'
import DefaultTitle from '../../../components/DefaultTitle'
import { useEffect, useState } from 'react'
import CardBoldTitleWithStatus from '../../../components/CardBoldTitleWithStatus'
import DefaultCard from '../../../components/DefaultCard'
import CardBoldTitle from '../../../components/CardBoldTitle'
import CustomButton from '../../../components/CustomButton'
import { useUserDataStore } from '../../../store/useUserData'
import { getAuthToken } from '../../../util/auth'
import api from '../../../services/api'
import SearchBar from '../../../components/SearchBar'
import { UserLoaderDataType } from '../../../types/types'
import { useRouteLoaderData } from 'react-router-dom'

const GestorTime = () => {
    const token = getAuthToken()
    const userData = useUserDataStore((state: any) => state.userData)
    const [managerEmployees, setManagerEmployees] = useState<any>([])
    const [employeesWithoutManager, setEmployeesWithoutManager] = useState<any>(
        []
    )
    const verifiedTokenData = useRouteLoaderData(
        'rootHome'
    ) as UserLoaderDataType
    const data = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') as string)
        : verifiedTokenData.id
    const [loading, setLoading] = useState(false)
    const [loadingEmployeesWithoutManager, setLoadingEmployeesWithoutManager] =
        useState(false)
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [snackbarMessage, setSnackbarMessage] = useState<string>('')
    const [snackbarSeverity, setSnackbarSeverity] =
        useState<AlertColor>('success')

    const handleClose = () => {
        setOpenSnackbar(false)
    }

    useEffect(() => {
        if (data.id) {
            setLoading(true)
            ;(async () => {
                const response = await api.get(
                    `/employees/manager/${data.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                setManagerEmployees(response.data)
                setLoading(false)
            })()
        }
    }, [])

    useEffect(() => {
        ;(async () => {
            setLoadingEmployeesWithoutManager(true)
            const response = await api.get(
                '/employees/manager/employees-without-manager',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            setEmployeesWithoutManager(response.data)
            setLoadingEmployeesWithoutManager(false)
        })()
    }, [])

    if (loading || loadingEmployeesWithoutManager) {
        return (
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                }}
            >
                <DefaultTitle>Carregando...</DefaultTitle>
                <CircularProgress color="success" />
            </Box>
        )
    }

    return (
        <>
            <Box>
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: {
                            xs: 'center',
                            md: 'flex-start',
                        },
                        alignItems: {
                            xs: 'center',
                            md: 'flex-start',
                        },
                        marginTop: '71px',
                        marginLeft: {
                            md: '240px',
                        },
                        maxWidth: {
                            md: 'calc(100% - 240px)',
                        },
                        padding: {
                            md: '0 0 0 1rem',
                        },
                    }}
                >
                    <Box marginBottom="1rem">
                        <DefaultTitle>
                            Adicione seus colegas de time
                        </DefaultTitle>

                        <SearchBar
                            data={employeesWithoutManager}
                            idEmployee={userData.id}
                            token={token}
                            isManager={true}
                        />
                    </Box>
                    <Box width="100%">
                        <DefaultTitle>Seu time</DefaultTitle>
                        <List
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: {
                                    xs: 'column',
                                    md: 'row',
                                },
                                flexWrap: 'wrap',
                            }}
                        >
                            {managerEmployees.map((employee: any) => (
                                <ListItem
                                    key={employee.id}
                                    sx={{
                                        width: {
                                            xs: 'calc(100vw - 2rem)',
                                            md: '300px',
                                            lg: '45%',
                                        },
                                        paddingLeft: '0',
                                    }}
                                >
                                    <DefaultCard width="100%">
                                        <Box
                                            display="flex"
                                            flexDirection="row"
                                            justifyContent="space-between"
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    gap: '1rem',
                                                    alignItems: 'center',
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
                                                    {employee.name[0].toUpperCase()}
                                                </Avatar>
                                                <Box>
                                                    <CardBoldTitle>
                                                        {employee.name}
                                                    </CardBoldTitle>
                                                    <Typography>
                                                        {employee.role}
                                                    </Typography>
                                                    <CardBoldTitleWithStatus
                                                        color={
                                                            employee.vacationStatus ===
                                                            'Vacation'
                                                                ? 'warning.main'
                                                                : employee.vacationStatus ===
                                                                  'Working'
                                                                ? 'primary'
                                                                : 'grey.500'
                                                        }
                                                    >
                                                        {employee.vacationStatus ===
                                                        'Vacation'
                                                            ? 'De Férias'
                                                            : employee.vacationStatus ===
                                                              'Working'
                                                            ? 'Trabalhando'
                                                            : 'Atraso'}
                                                    </CardBoldTitleWithStatus>
                                                </Box>
                                            </Box>
                                            <Box alignSelf="center">
                                                <CustomButton
                                                    type="reject"
                                                    variant="contained"
                                                    size="35px"
                                                    onClick={async () => {
                                                        try {
                                                            const token =
                                                                getAuthToken()
                                                            const response =
                                                                await api.patch(
                                                                    `/employees/${employee.id}`,
                                                                    {
                                                                        idManager:
                                                                            null,
                                                                    },
                                                                    {
                                                                        headers:
                                                                            {
                                                                                Authorization: `Bearer ${token}`,
                                                                            },
                                                                    }
                                                                )

                                                            if (response) {
                                                                const newManagerEmployees =
                                                                    managerEmployees.filter(
                                                                        (
                                                                            item: any
                                                                        ) =>
                                                                            item.id !==
                                                                            employee.id
                                                                    )

                                                                setManagerEmployees(
                                                                    newManagerEmployees
                                                                )
                                                            }

                                                            setSnackbarMessage(
                                                                'Colaborador removido com sucesso!'
                                                            )
                                                            setSnackbarSeverity(
                                                                'success'
                                                            )
                                                            setOpenSnackbar(
                                                                true
                                                            )
                                                        } catch (error) {
                                                            setSnackbarMessage(
                                                                'Erro ao remover colaborador!'
                                                            )
                                                            setSnackbarSeverity(
                                                                'error'
                                                            )
                                                            setOpenSnackbar(
                                                                true
                                                            )
                                                            return error
                                                        }
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    </DefaultCard>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Container>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleClose}
                sx={{
                    position: 'absolute',
                    top: '80%',
                    zIndex: 9999,
                }}
            >
                <Alert
                    onClose={handleClose}
                    severity={snackbarSeverity}
                    sx={{
                        width: '100%',
                        border: `1px solid ${
                            snackbarSeverity === 'success'
                                ? '#27AE60'
                                : '#FF5252'
                        }`,
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default GestorTime
