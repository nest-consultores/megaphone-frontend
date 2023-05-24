import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Unstable_Grid2 as Grid
} from '@mui/material'
import { editProfileQuery } from '../../../../config/axios'
import { useNavigate } from 'react-router-dom'
import UserTextField from '../../../commons/UserTextField'
import { showSwalError } from '../../../commons/showSwalError'
import { showSwalSuccess } from '../../../commons/showSwalSuccess'

const EditProfileForm = ({ user, setUser, auth, setAuth }) => {

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    editProfile(user)
  }

  const editProfile = async (user) => {
    try {
      await editProfileQuery('/editar-perfil', user, auth.token)
      showSwalSuccess('Se ha editado el perfil correctamente', 'Inicia sesión nuevamente')
      resetUserAndAuth()
      navigate('/iniciar-sesion')
    } catch (error) {
      const {msg} = error.response.data
      showSwalError('Ha ocurrido un error.', msg)
    }
  }

  const resetUserAndAuth = () => {
    setUser({
      id: '',
      name: '',
      email: '',
      currentPassword: '',
      password: '',
      role: '',
    })

    setAuth({
      id: '',
      isAuth: false,
      token: '',
      role: '',
      name: '',
      email: ''
    })

    localStorage.clear()
  }

  const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  /**
   * Comprueba si los campos necesarios para crear un usuario son válidos.
   *
   * @param {Object} user - Objeto que contiene los detalles del usuario.
   * @returns {boolean} - Retorna true si el usuario es válido, false en caso contrario.
   */
  function isValidForm(user) {
    return !!user.name && !!user.email && !!user.currentPassword && !!user.password
  }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card sx={{
        flexGrow: 1,
        px: 2,
        mx: 2
      }}>
        <CardHeader
          subheader="Puedes editar esta información"
          title="Edita tu perfil"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              display='flex'
              justifyContent='center'
              flexWrap='wrap'
            >
              <UserTextField
                name="name"
                helperText="Ingrese su nombre"
                onChange={handleInputChange}
                required
                value={user.name}
              />
              <UserTextField
                name="email"
                helperText="Correo electrónico"
                required
                value={user.email}
                disabled
              />
              <UserTextField
                name="currentPassword"
                label="Contraseña actual"
                type="currentPassword"
                onChange={handleInputChange}
                value={user.currentPassword}
                helperText="Ingrese contraseña actual"
                required

              />
              <UserTextField
                name="password"
                label="Nueva contraseña"
                type="password"
                onChange={handleInputChange}
                value={user.password}
                helperText="Ingrese nueva contraseña"
                required

              />
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button disabled={!isValidForm(user)} onClick={handleSubmit} variant="contained">
            Guardar cambios
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}

export default EditProfileForm
