'use client'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import { usePathname } from 'next/navigation.js'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { mainListItems, SecondaryListItems } from './ListItems.js'
import { useState } from 'react'
import removeForwardSlash from '../utils/removeForwardSlash.js'

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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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
}))

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

export default function DashboardComponent({ children }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box className="bg-base-100" sx={{ display: 'flex' }}>
        <CssBaseline />
        <div role="wrapper">
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
              className="bg-primary-content"
            >
              <IconButton
                edge="start"
                className="text-base-200"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <div className=' border-2 border-base-200 rounded-lg px-2'>
                <MenuIcon />
                </div>
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                className="capitalize text-neutral-content"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {
                  pathname.toLowerCase().includes("project-logs/")
                    ? "Log-Details"
                    : pathname.toLowerCase().includes("all-jobs/")
                      ? "Job Details"
                      : removeForwardSlash(pathname)
                }

              </Typography>
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
            <List className="min-h-screen bg-base-200" component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
              <SecondaryListItems />
            </List>
          </Drawer>
        </div>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}
