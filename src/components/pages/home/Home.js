// Importaciones de las librerías y componentes necesarios
import { Box, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import DashboardDetails from '../dashboard/section/DashboardDetails'
import { useNavigate } from 'react-router-dom'
import { HomeContext } from '../../../context/HomeContext'
import Swal from 'sweetalert2'
import { getDashboardQuery } from '../../../config/axios'

// Componente Home
const Home = () => {
  // Extraemos el contexto de autenticación
  const [auth] = useContext(HomeContext)
  
  // Definimos el estado del componente
  const [query, setQuery] = useState('operativo')
  const [dashboard, setDashboard] = useState('')
  
  // Inicializamos el hook de navegación
  const navigate = useNavigate()

  // Verifica si el usuario está autenticado, en caso contrario lo redirige a la página de inicio de sesión
  useEffect(() => {
    if (!auth.token) {
      localStorage.clear()
      navigate('/iniciar-sesion')
    }
  }, [navigate, auth.token])

  // Maneja el cambio de entrada en el formulario
  const handleInputChange = event => {
    setQuery(event.target.value)
  }

  // Recupera el dashboard según el rol y la consulta realizada
  useEffect(() => {
    const getDashboard = async dashToFound => {
      const { role } = auth
      try {
        const { dashboard } = await getDashboardQuery('/inicio', role, dashToFound, auth.token)
        setDashboard(dashboard)
      } catch (error) {
        const { msg } = error.response.data
        if (error.response.status === 500) {
          Swal.fire({
            icon: 'error',
            title: 'No se encuentra autenticado. Por favor, inicie sesión',
            text: error.response.data.msg,
          })
          localStorage.clear()
          navigate('/iniciar-sesion')
        }

        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: msg.error,
        })

        setDashboard('')
      }
    }

    getDashboard(query || 'operativo')
  }, [auth, navigate, query])

  // Renderizado del componente
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex'
      }}
    >
      <Container >
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Reportes
            </Typography>
          </div>
          <div>
            <Grid container >
              <Grid
                item={true}
                xs={12}
              >
                <Grid
                  item={true}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Seleccione un reporte"
                    name="query"
                    value={query}
                    onChange={handleInputChange}
                    required
                    select
                    SelectProps={{ native: true }}
                  >
                    {
                      auth.role === 'supervisor' ? (
                        <>
                          <option value='operativo'>Reporte de emisiones</option>
                        </>
                      ) : (
                        <>
                          <option value='operativo'>Reporte de emisiones</option>
                          <option value='estratégico'>Reporte estratégico</option>
                          <option value='rentabilidad'>Reporte de rentabilidad</option>
                        </>
                      )
                    }

                  </TextField>
                </Grid>
                <DashboardDetails dashboard={dashboard} />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  )
}

export default Home
