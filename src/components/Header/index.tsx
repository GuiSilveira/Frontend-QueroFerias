import {
    AppBar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    Divider,
    Link,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'

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
        console.log(openSidebarMenu)
        setOpenSidebarMenu(!openSidebarMenu)
    }

    return (
        <>
            <AppBar position="fixed">
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
            {openSidebarMenu === true ? (
                <Box
                    component="div"
                    sx={{
                        position: 'absolute',
                        top: '56px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        height: 'calc(100vh - 56px)',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    <Box
                        component="div"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Link href="#">Solicitar férias e 13º</Link>
                        <Link href="#">Aprovações</Link>
                    </Box>
                    <Link href="#">Sair</Link>
                </Box>
            ) : (
                ''
            )}
        </>
    )
}

export default Header
