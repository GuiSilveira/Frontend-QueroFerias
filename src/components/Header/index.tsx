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
import NotificationsIcon from '@mui/icons-material/Notifications'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LogoutIcon from '@mui/icons-material/Logout'
import Badge from '@mui/material/Badge'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import Drawer from '@mui/material/Drawer'

const drawerWidth = 240

const Header = () => {
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
                        justifyContent: 'space-between',
                    }}
                >
                    <IconButton
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
                        <IconButton size="small" color="inherit">
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={openSidebarMenu}
                onClose={handleOpenSidebarMenu}
                variant="temporary"
                sx={{
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
                            {[
                                'Solicitar férias e 13º',
                                'Todas as solicitações',
                            ].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {index % 2 === 0 ? (
                                                <CalendarMonthIcon />
                                            ) : (
                                                <EventAvailableIcon />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </div>
                <Button
                    variant="text"
                    startIcon={<LogoutIcon />}
                    color="inherit"
                    sx={{
                        justifyContent: 'flex-start',
                        padding: '0.5rem 1.5rem',
                        gap: '1rem',
                    }}
                >
                    Sair
                </Button>
            </Drawer>
        </Box>
    )
}

export default Header
