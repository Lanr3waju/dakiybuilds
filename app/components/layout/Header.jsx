'use client'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import { usePathname, useRouter } from 'next/navigation.js'
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
import { ArrowBack } from '@mui/icons-material'

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

const defaultTheme = createTheme()

export default function DashboardComponent({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box className="bg-base-100" sx={{ display: 'flex' }}>
        <CssBaseline />
        <div className='bg-base-200' role="wrapper">
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
              className="bg-primary"
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
                <div className=" rounded-lg border-2 border-base-200 px-2">
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
                <div className="flex w-full flex-row items-center justify-between p-3 md:p-1">
                  {pathname.toLowerCase().includes('project-logs/')
                    ? 'Log-Details'
                    : pathname.toLowerCase().includes('/update-sheet')
                      ? 'Job Details (Progress Update Sheet)'
                      : pathname.toLowerCase().includes('all-jobs/')
                        ? 'Job Details'
                        : removeForwardSlash(pathname)}
                  <button
                    disabled={pathname.toLowerCase().includes('/dakiyboard')}
                    className="btn btn-secondary btn-sm disabled:cursor-not-allowed"
                    onClick={() => router.back()}
                  >
                    <ArrowBack />
                  </button>
                </div>
              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer variant="permanent" open={open}>
            <Toolbar
              className='bg-base-100'
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <div className="h-full bg-base-200">
              <List component="nav">
                {mainListItems}
                <Divider sx={{ my: 1 }} />
                <SecondaryListItems />
              </List>
            </div>
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
