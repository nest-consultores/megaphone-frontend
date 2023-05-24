import { useContext, useEffect } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'

import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Logo from '../../assets/images/logo-megaphone.png'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { HomeContext } from '../../context/HomeContext'
import { adminPaths, encargadoPaths, superPaths } from '../../utils'

const drawerWidth = 240

const FixedDrawer = () =>  {

  const navigate = useNavigate()
  const [auth, setAuth] = useContext(HomeContext)

  const logout = () => {
    setAuth({
      id: '',
      isAuth: false,
      token: '',
      role: '',
      name: '',
      email: ''
    })
    localStorage.clear()
    navigate('/iniciar-sesion')
  }


  const mainPath = auth.role === 'admin'
  ? adminPaths
  : auth.role === 'encargado'
    ? encargadoPaths
    : superPaths

  
  useEffect(() => {
    setAuth({
      id: localStorage.getItem('id'),
      token: localStorage.getItem('token'),
      isAuth: true,
      role: localStorage.getItem('role'),
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
    })

  }, [setAuth])

  console.log(auth, mainPath)

  const list = () => (
    <Box
      role="presentation"
    >
      <Box sx={{ p: 2 }}>
        <Box
          href="/"
          sx={{
            display: 'inline-flex',
            width: 16
          }}
        >
        </Box>
        <img src={Logo} alt="Megaphone" />
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            borderRadius: 1,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
            p: '12px'
          }}
        >
          <div>
            <Typography
              color="white"
              variant="subtitle1"
            >
              {auth.name}
            </Typography>
          </div>

        </Box>
      </Box>
      <List>
        {mainPath.map(({ title, index, icon, path }) => (
          <ListItem
            key={index}
            disablePadding
            component={Link}
            to={path}
            style={{ color: 'white' }}
          >
            <ListItemButton onClick={title === 'Cerrar sesión' ? logout : null}>

              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

    </Box>
  )


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px` }}
      >

      </AppBar>

      <Drawer

        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {list()}
      </Drawer>
      <Box
        sx={{ flexGrow: 2, p: 3 }} >
        <Outlet />
      </Box>
    </Box>
  )
}

export default FixedDrawer