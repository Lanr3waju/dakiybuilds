'use client'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { mainListItems, secondaryListItems } from './ListItems.js'
import { useState } from 'react'
import Progress from './Progress.jsx'
import Greeting from './greeting/Greeting.jsx'
import Weather from './getCurrentWeather/Weather.jsx'
import GetDate from './greeting/GetDate.jsx'
import Overview from './Overview/Overview.jsx'
import Milestone from './Overview/Milestone.jsx'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https:/#/">
                dakiyBuilds
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            backgroundColor: 'inherit',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
)

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

export default function DashboardComponent() {
    const [open, setOpen] = useState(true)
    const toggleDrawer = () => {
        setOpen(!open)
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box className="bg-base-100" sx={{ display: 'flex' }}>
                <CssBaseline />
                <div className='hidden md:block' role='wrapper'>
                    <AppBar position="absolute" open={open}>
                        <Toolbar
                            sx={{
                                pr: '24px', // keep right padding when drawer closed
                            }}
                            className='bg-primary-content'
                        >
                            <IconButton
                                edge="start"
                                className='bg-primary-content text-neutral-content'
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '36px',
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                className='text-neutral-content'
                                noWrap
                                sx={{ flexGrow: 1 }}
                            >
                                Dashboard
                            </Typography>
                            <IconButton color="inherit">
                                <Badge badgeContent={4} className='text-secondary-content'>
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Toolbar>
                    </AppBar>

                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1],
                            }}
                        >
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Toolbar>
                        <Divider />
                        <List className='bg-base-200' component="nav">
                            {mainListItems}
                            <Divider sx={{ my: 1 }} />
                            {secondaryListItems}
                        </List>
                    </Drawer>
                </div>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />

                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        {/* Progress Bar */}
                        <Progress />
                        <Grid container spacing={3}>
                            {/* Greeting */}
                            <Grid item xs={12} md={8} lg={8}>
                                <Paper
                                    className='flex flex-row justify-between'
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 120,
                                    }}
                                >
                                    <Greeting />
                                    <Weather />
                                </Paper>
                                {/* Overview */}
                                <Paper
                                    className='mt-2'
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 500,
                                        backgroundColor: 'primary'
                                    }}
                                >
                                    <Overview />
                                </Paper>
                            </Grid>
                            {/* Date and Milestone */}
                            <Grid item xs={12} md={4} lg={4}>
                                <Paper
                                    className='bg-info-content'
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100vh',
                                        backgroundColor: 'primary'
                                    }}
                                >
                                    <GetDate />
                                    <Milestone />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}
