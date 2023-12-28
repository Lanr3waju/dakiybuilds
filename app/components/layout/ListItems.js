import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Divider from '@mui/material/Divider'
import PeopleIcon from '@mui/icons-material/People'
import Image from 'next/image'
import Link from 'next/link'
import {
  BusinessCenterRounded,
  CalendarMonth,
  Folder,
  Notes,
  RequestQuote,
  Settings,
} from '@mui/icons-material'
import { DakiyStore } from '@/context/context'
import { useContext } from 'react'
import HorizontalLine from '../utils/HorizontalLine'
import { getAcronym } from '../utils/getAcronym'



export const mainListItems = (
  <>
    <Link href="/dakiyboard">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="DakiyBoard" />
      </ListItemButton>
    </Link>

    <Link href="/project-documents">
      <ListItemButton>
        <ListItemIcon>
          <Folder />
        </ListItemIcon>
        <ListItemText primary="Project Documents" />
      </ListItemButton>
    </Link>

    <Link href="/project-schedule">
      <ListItemButton>
        <ListItemIcon>
          <CalendarMonth />
        </ListItemIcon>
        <ListItemText primary="Project Schedule" />
      </ListItemButton>
    </Link>

    <Link href="/project-team">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Project Team" />
      </ListItemButton>
    </Link>

    <Link href="/project-logs">
      <ListItemButton>
        <ListItemIcon>
          <Notes />
        </ListItemIcon>
        <ListItemText primary="Project Logs" />
      </ListItemButton>
    </Link>

    <Link href="/project-finances">
      <ListItemButton>
        <ListItemIcon>
          <RequestQuote />
        </ListItemIcon>
        <ListItemText primary="Project Finances" />
      </ListItemButton>
    </Link>

    <Link href="/all-jobs">
      <ListItemButton>
        <ListItemIcon>
          <BusinessCenterRounded />
        </ListItemIcon>
        <ListItemText primary="All Jobs" />
      </ListItemButton>
    </Link>

    <Link href="/project-settings">
      <ListItemButton>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="Project Settings" />
      </ListItemButton>
    </Link>
  </>
)

export const SecondaryListItems = () => {
  const { projects } = useContext(DakiyStore)
  return (
    <div>
      <Image
        className="h-20 bg-base-200 object-cover"
        src="/logo.png"
        width={200}
        quality={100}
        height={70}
        loading="lazy"
        alt="logo" />
      <Link href="/add-job">
      <ListItemButton>
        <ListItemIcon>
            + <BusinessCenterRounded />
        </ListItemIcon>
        + Add Jobs
      </ListItemButton>
      </Link>
      <HorizontalLine />
      {
        projects?.map(({ name, id }) => (
          <Link className='font-Poppins font-bold text-primary-content/80' key={id} href={`/all-jobs/${id}`}>
              <ListItemButton>
                <h2>{getAcronym(name)}</h2>
            </ListItemButton>
            <Divider />
          </Link>
        ))
      }
    </div >
  )
}
