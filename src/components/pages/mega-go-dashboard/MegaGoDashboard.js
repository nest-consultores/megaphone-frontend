import {
  Box,
  Card,
  CardContent,
  Unstable_Grid2 as Grid
} from '@mui/material'


const MegaGoDashboard = ({ dashboard }) => {
  const link = 'https://app.powerbi.com/view?r=eyJrIjoiODAwMTlmODItYmRmOC00ZGI3LThiY2QtODU5ODZhYTRiMTM1IiwidCI6ImQwZDljYzdlLTc3MzQtNGRjYS1hODZjLThlOTg3ZDhhOTQzYSJ9&pageName=ReportSection448b6fe8d45dcebc3e92'
  const name = 'Reporte Mega GO'
  return (

    <Card sx={{
      px: 2,
      mx: 2,
      my: 1
    }}>

      <CardContent>
        <Box sx={{ m: -1.5 }} >
          <Grid
            container
            spacing={3}
          >
            <iframe width="1100px" height='600px' className='dashboard-view' title={name} src={link} ></iframe>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}

export default MegaGoDashboard