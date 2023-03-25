import {
    AppBar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Button,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import GroupsIcon from '@mui/icons-material/Groups'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import NotificationsIcon from '@mui/icons-material/Notifications'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LogoutIcon from '@mui/icons-material/Logout'
import Badge from '@mui/material/Badge'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import Logo from '../../assets/logo.svg'
import { Form, Link, useLoaderData } from 'react-router-dom'
import { UserLoaderDataType } from '../../types/types'

const drawerWidth = 240

const Header = () => {
    const { position } = useLoaderData() as UserLoaderDataType
    const theme = useTheme()
    const [anchorElNotification, setAnchorElNotification] =
        useState<null | HTMLElement>(null)
    const [openSidebarMenu, setOpenSidebarMenu] = useState<boolean>(false)

    const handleOpenNotificationMenu = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        setAnchorElNotification(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElNotification(null)
    }

    const handleOpenSidebarMenu = () => {
        setOpenSidebarMenu(!openSidebarMenu)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar
                    sx={{
                        color: `${theme.palette.common.white}`,
                        display: 'flex',
                        justifyContent: {
                            xs: 'space-between',
                            md: 'flex-end',
                        },
                    }}
                >
                    <Link
                        to={'/home'}
                        style={{
                            position: 'absolute',
                            left: '0',
                            marginLeft: '24px',
                        }}
                    >
                        <Box
                            component="img"
                            src={Logo}
                            display={{
                                xs: 'none',
                                md: 'block',
                            }}
                        />
                    </Link>
                    <IconButton
                        sx={{
                            display: {
                                md: 'none',
                            },
                        }}
                        size="large"
                        color="inherit"
                        onClick={handleOpenSidebarMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box component="div" sx={{ display: 'flex', gap: '4px' }}>
                        <IconButton
                            size="medium"
                            color="inherit"
                            onClick={handleOpenNotificationMenu}
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Menu
                            open={Boolean(anchorElNotification)}
                            onClose={handleCloseUserMenu}
                            anchorEl={anchorElNotification}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                        >
                            <MenuItem key={1} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">
                                    "Notificação 1"
                                </Typography>
                            </MenuItem>
                            <Divider light />
                            <MenuItem key={2} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">
                                    "Notificação 2"
                                </Typography>
                            </MenuItem>
                        </Menu>
                        <Link
                            to={'/home/profile'}
                            style={{
                                textDecoration: 'none',
                                color: `${theme.palette.common.white}`,
                            }}
                        >
                            <IconButton size="small" color="inherit">
                                <AccountCircle />
                            </IconButton>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={openSidebarMenu}
                onClose={handleOpenSidebarMenu}
                variant="temporary"
                sx={{
                    display: { xs: 'block', lg: 'none' },
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        justifyContent: 'space-between',
                    },
                }}
                hideBackdrop={true}
            >
                <div>
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {position !== 'Admin' && (
                                <>
                                    <ListItem
                                        key={'Solicitar férias e 13º'}
                                        disablePadding
                                    >
                                        <Link
                                            to={'/home/solicitar'}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit',
                                                width: '100%',
                                            }}
                                        >
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <CalendarMonthIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        'Solicitar férias e 13º'
                                                    }
                                                />
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                    <ListItem
                                        key={'Todas as solicitações'}
                                        disablePadding
                                    >
                                        <Link
                                            to={'/home/solicitacoes'}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit',
                                                width: '100%',
                                            }}
                                        >
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <EventAvailableIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        'Todas as solicitações'
                                                    }
                                                />
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                </>
                            )}

                            {position === 'Manager' && (
                                <>
                                    <ListItem
                                        key={'Seu Dashboard'}
                                        disablePadding
                                    >
                                        <Link
                                            to={'/home/gestor/dashboard'}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit',
                                                width: '100%',
                                            }}
                                        >
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <DashboardIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={'Seu Dashboard'}
                                                />
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                    <ListItem
                                        key={'Solicitações dos Funcionários'}
                                        disablePadding
                                    >
                                        <Link
                                            to={'/home/gestor/solicitacoes'}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit',
                                                width: '100%',
                                            }}
                                        >
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <PendingActionsIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        'Solicitações dos Funcionários'
                                                    }
                                                />
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                    <ListItem key={'Sua Equipe'} disablePadding>
                                        <Link
                                            to={'/home/gestor/time'}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit',
                                                width: '100%',
                                            }}
                                        >
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <GroupsIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={'Sua Equipe'}
                                                />
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                </>
                            )}
                            {position === 'Admin' && (
                                <ListItem
                                    key={'Registrar Funcionários'}
                                    disablePadding
                                >
                                    <Link
                                        to={'/home/register'}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            width: '100%',
                                        }}
                                    >
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <GroupsIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    'Registrar Funcionários'
                                                }
                                            />
                                        </ListItemButton>
                                    </Link>
                                </ListItem>
                            )}
                        </List>
                    </Box>
                </div>
                <Form action="/logout" method="post">
                    <Button
                        variant="text"
                        startIcon={<LogoutIcon />}
                        color="inherit"
                        sx={{
                            justifyContent: 'flex-start',
                            padding: '0.5rem 1.5rem',
                            gap: '1rem',
                            width: '100%',
                        }}
                        type="submit"
                    >
                        Sair
                    </Button>
                </Form>
            </Drawer>
            <Drawer
                anchor="left"
                open={openSidebarMenu}
                onClose={handleOpenSidebarMenu}
                variant="permanent"
                sx={{
                    display: {
                        xs: 'none',
                        md: 'block',
                    },
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        justifyContent: 'space-between',
                    },
                }}
                hideBackdrop={true}
            >
                <div>
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {position !== 'Admin' && (
                                <>
                                    <ListItem
                                        key={'Solicitar férias e 13º'}
                                        disablePadding
                                    >
                                        <Link
                                            to={'/home/solicitar'}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit',
                                                width: '100%',
                                            }}
                                        >
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <CalendarMonthIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        'Solicitar férias e 13º'
                                                    }
                                                />
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                    <ListItem
                                        key={'Todas as solicitações'}
                                        disablePadding
                                    >
                                        <Link
                                            to={'/home/solicitacoes'}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit',
                                                width: '100%',
                                            }}
                                        >
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <EventAvailableIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        'Todas as solicitações'
                                                    }
                                                />
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                </>
                            )}
                            {position === 'Manager' && (
                                <>
                                    <ListItem
                                        key={'Seu Dashboard'}
                                        disablePadding
                                    >
                                        <Link
                                            to={'/home/gestor/dashboard'}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit',
                                                width: '100%',
                                            }}
                                        >
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <DashboardIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={'Seu Dashboard'}
                                                />
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                    <ListItem
                                        key={'Solicitações dos Funcionários'}
                                        disablePadding
                                    >
                                        <Link
                                            to={'/home/gestor/solicitacoes'}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit',
                                                width: '100%',
                                            }}
                                        >
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <PendingActionsIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        'Solicitações dos Funcionários'
                                                    }
                                                />
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                    <ListItem key={'Sua Equipe'} disablePadding>
                                        <Link
                                            to={'/home/gestor/time'}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit',
                                                width: '100%',
                                            }}
                                        >
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <GroupsIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={'Sua Equipe'}
                                                />
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                </>
                            )}
                            {position === 'Admin' && (
                                <ListItem
                                    key={'Registrar Funcionários'}
                                    disablePadding
                                >
                                    <Link
                                        to={'/home/register'}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            width: '100%',
                                        }}
                                    >
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <GroupsIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    'Registrar Funcionários'
                                                }
                                            />
                                        </ListItemButton>
                                    </Link>
                                </ListItem>
                            )}
                        </List>
                    </Box>
                </div>
                <Form action="/logout" method="post">
                    <Button
                        variant="text"
                        startIcon={<LogoutIcon />}
                        color="inherit"
                        type="submit"
                        sx={{
                            justifyContent: 'flex-start',
                            padding: '0.5rem 1.5rem',
                            gap: '1rem',
                            width: '100%',
                        }}
                    >
                        Sair
                    </Button>
                </Form>
            </Drawer>
        </Box>
    )
}

export default Header
