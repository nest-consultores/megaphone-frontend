// Importaciones de las librerías y componentes necesarios
import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import { useContext, useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import CreateUserForm from './section/CreateUserForm'
import { showSwalError } from '../../commons/showSwalError'
import { HomeContext } from '../../../context/HomeContext'

/**
 * CreateUser es un componente que permite crear un nuevo usuario
 * Este componente redirige a los usuarios con rol 'supervisor' ya que no tienen permisos para crear usuarios
 */
const CreateUser = () => {
  // Obtención de las funciones de navegación y contexto de autenticación
  const navigate = useNavigate()
  const [auth] = useContext(HomeContext)

  // Efecto para redirigir a los usuarios 'supervisor' a la página de inicio de sesión
  useEffect(() => {
    if(auth.role === 'supervisor'){
      showSwalError('Ha ocurrido un error', 'No tienes los permisos para acceder a esta opción')
      navigate('/iniciar-sesion')
    }
  }, [auth.role, navigate])
  
  // Retorno del componente
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex'
      }}
    >
      <Container maxWidth="lg" >
        <Stack spacing={3}>
          <Typography variant="h4">
            Crear usuario
          </Typography>
          <Grid container display='flex'  >
            <Grid item xs={12}>
              <CreateUserForm />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  )
}

export default CreateUser