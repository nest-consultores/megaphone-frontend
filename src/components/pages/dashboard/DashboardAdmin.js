import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import DashboardEdits from './section/DashboardEdit'
import { HomeContext } from '../../../context/HomeContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { showSwalError } from '../../commons/showSwalError'

const DashboardAdmin = () => {

  const [auth] = useContext(HomeContext)
  const navigate = useNavigate()

  useEffect(() => {

    if(localStorage.getItem('role') !== 'admin' || !localStorage.getItem('token') ) {
      showSwalError('Ha ocurrido un error', 'No tienes los permisos para acceder a esta opción' )

      navigate('/inicio')
    }

  }, [auth, navigate])
  

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex'
      }}
    >
      <Container maxWidth="lg" >
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Crear o editar dashboard
            </Typography>
          </div>
          <div>
            <Grid container display='flex'  >
              <Grid
                item={true}
                xs={12}
                md={12}
                lg={12}
              >
                <DashboardEdits />
              </Grid>

            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  )
}

export default DashboardAdmin