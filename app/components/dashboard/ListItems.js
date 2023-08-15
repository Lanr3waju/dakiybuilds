import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import Image from 'next/image'
import Link from 'next/link'
import { BusinessCenterRounded, CalendarMonth, Folder, Notes, RequestQuote, Settings, Summarize } from '@mui/icons-material'

export const mainListItems = (
    <>
        <Link href='/dakiyboard'>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="DakiyBoard" />
            </ListItemButton>
        </Link>

        <Link href='/project-documents'>
            <ListItemButton>
                <ListItemIcon>
                    <Folder />
                </ListItemIcon>
                <ListItemText primary="Project Documents" />
            </ListItemButton>
        </Link>

        <Link href='/project-schedule'>
            <ListItemButton>
                <ListItemIcon>
                    <CalendarMonth />
                </ListItemIcon>
                <ListItemText primary="Project Schedule" />
            </ListItemButton>
        </Link>

        <Link href='/project-team'>
            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Project Team" />
            </ListItemButton>
        </Link>

        <Link href='/project-logs'>
            <ListItemButton>
                <ListItemIcon>
                    <Notes />
                </ListItemIcon>
                <ListItemText primary="Project Logs" />
            </ListItemButton>
        </Link>

        <Link href='/project-finances'>
            <ListItemButton>
                <ListItemIcon>
                    <RequestQuote />
                </ListItemIcon>
                <ListItemText primary="Project Finances" />
            </ListItemButton>
        </Link>

        <Link href='/project-reports'>
            <ListItemButton>
                <ListItemIcon>
                    <Summarize />
                </ListItemIcon>
                <ListItemText primary="Project Reports" />
            </ListItemButton>
        </Link>

        <Link href='/all-jobs'>
            <ListItemButton>
                <ListItemIcon>
                    <BusinessCenterRounded />
                </ListItemIcon>
                <ListItemText primary="All Jobs" />
            </ListItemButton>
        </Link>

        <Link href='/project-settings'>
            <ListItemButton>
                <ListItemIcon>
                    <Settings />
                </ListItemIcon>
                <ListItemText primary="Project Settings" />
            </ListItemButton>
        </Link>
    </>
)

export const secondaryListItems = (
    <>
        <ListSubheader className='bg-base-200 pl-1' component="div" inset>
            <Image
                className="h-20 object-cover"
                src='/logo.png'
                width={200}
                quality={100}
                height={70}
                loading="lazy"
                alt="logo"
            />
        </ListSubheader>

        <ListItemButton>
            <ListItemIcon>
                <BusinessCenterRounded />
            </ListItemIcon>
            <button type='button'>+ Add Jobs</button>
        </ListItemButton>
    </>
)
