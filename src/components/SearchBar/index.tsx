import {
    Avatar,
    Box,
    Card,
    IconButton,
    InputBase,
    List,
    ListItemButton,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import CardBoldTitle from '../CardBoldTitle'
import DefaultModal from '../DefaultModal'
import SearchIcon from '@mui/icons-material/Search'
import api from '../../services/api'
import { useUserDataStore } from '../../store/useUserData'

type SearchBarProps = {
    data: []
    idEmployee: number
    token: string | null
    isManager: boolean
}

type EmployeeType = {
    id: number
    name: string
    role: string
    area: string
}

function SearchBar({ data, idEmployee, token, isManager }: SearchBarProps) {
    const [open, setOpen] = useState(false)
    const [filteredData, setFilteredData] = useState<any>([])
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const typedData = data as EmployeeType[]
    const [selectedEmployee, setSelectedEmployee] = useState<any>()
    const setUserData = useUserDataStore((state: any) => state.setUserData)

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value
        const newFilter = typedData.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase())
        })

        if (searchWord === '') {
            setFilteredData([])
        } else {
            setFilteredData(newFilter)
        }
    }

    return (
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
                onChange={handleFilter}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
            {filteredData.length !== 0 && (
                <Card
                    sx={{
                        position: 'absolute',
                        top: '105%',
                        zIndex: 1,
                        width: '100%',
                        backgroundColor: 'primary.100',
                        height: '200px',
                        overflowY: 'scroll',
                    }}
                >
                    <List>
                        {filteredData
                            .slice(0, 15)
                            .map((employee: EmployeeType) => {
                                return (
                                    <ListItemButton
                                        onClick={() => {
                                            setSelectedEmployee(employee)
                                            handleOpen()
                                        }}
                                        key={employee.id}
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
                                            {employee.name[0].toUpperCase()}
                                        </Avatar>
                                        <Box>
                                            <CardBoldTitle>
                                                {employee.name}
                                            </CardBoldTitle>
                                            <Typography>
                                                {employee.role}
                                            </Typography>
                                        </Box>
                                    </ListItemButton>
                                )
                            })}
                    </List>
                    <DefaultModal
                        isOpen={open}
                        closeModal={handleClose}
                        approveText="Adicionar"
                        rejectText="Recusar"
                        handleApproval={async () => {
                            let response
                            if (!isManager) {
                                response = await api.patch(
                                    `/employees/${idEmployee}`,
                                    {
                                        idManager: String(selectedEmployee.id),
                                    },
                                    {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                        },
                                    }
                                )
                            } else {
                                response = await api.patch(
                                    `/employees/${String(selectedEmployee.id)}`,
                                    {
                                        idManager: idEmployee,
                                    },
                                    {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                        },
                                    }
                                )
                            }

                            if (response.status === 200) {
                                setUserData(response.data)
                            }

                            handleClose()
                        }}
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
                                    backgroundColor: 'primary.light',
                                    color: 'primary.main',
                                    width: 50,
                                    height: 50,
                                    fontSize: 20,
                                    fontWeight: 'medium',
                                }}
                            >
                                {selectedEmployee?.name[0].toUpperCase()}
                            </Avatar>
                            <Box>
                                <CardBoldTitle>
                                    {selectedEmployee?.name}
                                </CardBoldTitle>
                                <Typography>
                                    {selectedEmployee?.role}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography
                            sx={{
                                marginTop: '.5rem',
                                marginBottom: '1rem',
                            }}
                        >
                            Você deseja adicionar essa pessoa ao seu time?
                        </Typography>
                    </DefaultModal>
                </Card>
            )}
        </Box>
    )
}

export default SearchBar
