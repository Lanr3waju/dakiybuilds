import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Progress from '../utils/Progress.jsx'
import Greeting from './greeting/Greeting.jsx'
import Weather from './getCurrentWeather/Weather.jsx'
import GetDate from './greeting/GetDate.jsx'
import Overview from './Overview/Overview.jsx'
import Milestone from './Overview/Milestone.jsx'

export default function DashboardComponent() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Progress Bar */}
      <Progress progress={80} />
      <Grid container spacing={3}>
        {/* Greeting */}
        <Grid item xs={12} md={8} lg={8}>
          <Paper
            className="flex flex-col justify-between md:flex-row"
            sx={{
              p: 2,
              display: 'flex',
              height: 120,
            }}
          >
            <Greeting />
            <Weather />
          </Paper>
          {/* Overview */}
          <Paper
            className="mt-2"
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 500,
              backgroundColor: 'primary',
            }}
          >
            <Overview />
          </Paper>
        </Grid>
        {/* Date and Milestone */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            className="bg-info-content"
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '90vh',
            }}
          >
            <GetDate />
            <Milestone />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
