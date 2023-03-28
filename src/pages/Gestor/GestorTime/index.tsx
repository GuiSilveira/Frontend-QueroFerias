import {
    Avatar,
    Box,
    Container,
    List,
    ListItem,
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

const GestorTime = () => {
    const token = getAuthToken()
    const userData = useUserDataStore((state: any) => state.userData)
    const [managerEmployees, setManagerEmployees] = useState<any>([])
    const [employeesWithoutManager, setEmployeesWithoutManager] = useState<any>(
        []
    )

    useEffect(() => {
        if (userData.id) {
            ;(async () => {
                const response = await api.get(
                    `/employees/manager/${userData.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                setManagerEmployees(response.data)
            })()
        }
    }, [userData])

    useEffect(() => {
        ;(async () => {
            const response = await api.get(
                '/employees/manager/employees-without-manager',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            setEmployeesWithoutManager(response.data)
        })()
    }, [])

    if (!userData.id) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <Typography variant="h4">Carregando...</Typography>
            </Box>
        )
    }

    return (
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
                    <DefaultTitle>Adicione seus colegas de time</DefaultTitle>

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
                                                onClick={async () => {
                                                    const token = getAuthToken()
                                                    const response =
                                                        await api.patch(
                                                            `/employees/${employee.id}`,
                                                            {
                                                                idManager: null,
                                                            },
                                                            {
                                                                headers: {
                                                                    Authorization: `Bearer ${token}`,
                                                                },
                                                            }
                                                        )

                                                    if (response) {
                                                        const newManagerEmployees =
                                                            managerEmployees.filter(
                                                                (item: any) =>
                                                                    item.id !==
                                                                    employee.id
                                                            )

                                                        setManagerEmployees(
                                                            newManagerEmployees
                                                        )
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
    )
}

export default GestorTime
