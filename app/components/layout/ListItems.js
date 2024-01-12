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
          <div className="ml-2 md:tooltip md:tooltip-bottom md:before:whitespace-pre-wrap md:before:[--tw-content:'Dakiy_\a_Board']" data-tip>
            <DashboardIcon />
          </div>
        </ListItemIcon>
        <ListItemText primary="DakiyBoard" />
      </ListItemButton>
    </Link>

    <Link href="/project-documents">
      <ListItemButton>
        <ListItemIcon>
          <div className="ml-2 md:tooltip md:tooltip-bottom md:before:whitespace-pre-wrap md:before:[--tw-content:'Project_\a_Docs']" data-tip>
            <Folder />
          </div>
        </ListItemIcon>
        <ListItemText primary="Project Documents" />
      </ListItemButton>
    </Link>

    <Link href="/project-schedule">
      <ListItemButton>
        <ListItemIcon>
          <div className="ml-2 md:tooltip md:tooltip-bottom md:before:whitespace-pre-wrap md:before:[--tw-content:'Project_\a_Schedule']" data-tip>
            <CalendarMonth />
          </div>
        </ListItemIcon>
        <ListItemText primary="Project Schedule" />
      </ListItemButton>
    </Link>

    <Link href="/project-team">
      <ListItemButton>
        <ListItemIcon>
          <div className="ml-2 md:tooltip md:tooltip-bottom md:before:whitespace-pre-wrap md:before:[--tw-content:'Project_\a_Team']" data-tip>
            <PeopleIcon />
          </div>
        </ListItemIcon>
        <ListItemText primary="Project Team" />
      </ListItemButton>
    </Link>

    <Link href="/project-logs">
      <ListItemButton>
        <ListItemIcon>
          <div className="ml-2 md:tooltip md:tooltip-bottom md:before:whitespace-pre-wrap md:before:[--tw-content:'Project_\a_Logs']" data-tip>
            <Notes />
          </div>
        </ListItemIcon>
        <ListItemText primary="Project Logs" />
      </ListItemButton>
    </Link>

    <Link href="/project-finances">
      <ListItemButton>
        <ListItemIcon>
          <div className="ml-2 md:tooltip md:tooltip-bottom md:before:whitespace-pre-wrap md:before:[--tw-content:'Project_\a_Finance']" data-tip>
            <RequestQuote />
          </div>
        </ListItemIcon>
        <ListItemText primary="Project Finances" />
      </ListItemButton>
    </Link>

    <Link href="/all-jobs">
      <ListItemButton>
        <ListItemIcon>
          <div className="ml-2 md:tooltip md:tooltip-bottom md:before:whitespace-pre-wrap md:before:[--tw-content:'All_\a_Jobs']" data-tip>
            <BusinessCenterRounded />
          </div>
        </ListItemIcon>
        <ListItemText primary="All Jobs" />
      </ListItemButton>
    </Link>

    <Link href="/project-settings">
      <ListItemButton>
        <ListItemIcon>
          <div className="ml-2 md:tooltip md:tooltip-bottom md:before:whitespace-pre-wrap md:before:[--tw-content:'Project_\a_Settings']" data-tip>
            <Settings />
          </div>
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
            <div className="md:tooltip md:tooltip-bottom md:before:whitespace-pre-wrap md:before:[--tw-content:'Add_\a_Job']" data-tip>
              + <BusinessCenterRounded />
            </div>
          </ListItemIcon>
          + Add Jobs
        </ListItemButton>
      </Link>
      <HorizontalLine />
      {projects && projects.map(({ name, id }) => (
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
