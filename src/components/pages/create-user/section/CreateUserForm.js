import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { HomeContext } from '../../../../context/HomeContext'
import dashAxios, { createUserAccountQuery } from '../../../../config/axios'

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
import Swal from 'sweetalert2'
import UserTextField from '../../../commons/UserTextField'
import { showSwalSuccess } from '../../../commons/showSwalSuccess'


const CreateUserForm = () => {
  let navigate = useNavigate()
  const [auth] = useContext(HomeContext)
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    // TODO: remover este active
    active: 1
  })


  
  useEffect(() => {
    const validateUser = (isAuth, token, navigate) => {
      if (!localStorage.getItem('role') || localStorage.getItem('role') === 'supervisor') {
        showSwalError('No tienes los permisos para acceder a esta función')
        navigate('/iniciar-sesion')
      }
    }

    validateUser(auth.isAuth, auth.token, navigate)
  }, [auth.isAuth, auth.token, navigate])



  const showSwalError = (text) => {
    Swal.fire({
      icon: 'error',
      title: 'Ha ocurrido un error',
      text: text,
    })
  }


  const createUser = async (user) => {
    try {
      const response = await createUserAccountQuery('/crear-usuario', user, auth.token)
      const { msg } = response.data.msg
      showSwalSuccess(msg)
      setUser({
        name: '',
        email: '',
        password: '',
        role: '',
        active: 1
      })

    } catch (error) {
      const { msg } = error.response.data
      showSwalError(msg)
    }
  }

  const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createUser(user)
  }

  function isValidUser(user) {
    return !!user.role && !!user.name && !!user.email && !!user.password
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
          title="Crea un nuevo usuario para tu organización"
          subheader="Debes ingresar los datos en los campos respectivos"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <UserTextField
                name="name"
                label="Ingrese el nombre del usuario"
                onChange={handleInputChange}
                required
                value={user.name}
              />
              <UserTextField
                name="email"
                label="Correo electrónico asociado"
                onChange={handleInputChange}
                required
                value={user.email}
              />
              <UserTextField
                name="password"
                label="Contraseña"
                type="password"
                onChange={handleInputChange}
                required
                value={user.password}
              />
              <UserTextField
                name="role"
                label="Seleccione un rol"
                select
                SelectProps={{ native: true }}
                onChange={handleInputChange}
                required
                value={user.role}
              >
                {
                  user.role === 'supervisor' ? (
                    <>
                      <option value='null'></option>
                      <option value='gerente'>Gerente</option>
                      <option value='supervisor'>Supervisor</option>
                    </>
                  ) : (
                    <>
                      <option value='null'></option>
                      <option value='gerente'>Gerente</option>
                      <option value='supervisor'>Supervisor</option>
                      <option value='encargado'>Encargado</option>
                    </>
                  )
                }
              </UserTextField>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button disabled={!isValidUser(user)} type='submit' variant="contained">
            Crear
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}

export default CreateUserForm
