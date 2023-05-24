import React, { Fragment, useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home  from './components/pages/home/Home'
import CreateUser from './components/pages/create-user/CreateUser'
import DeleteUser from './components/pages/delete-user/DeleteUser'
import EditProfile from './components/pages/edit-profile/EditProfile'
import Footer from './components/footer/Footer'
import { HomeContext, HomeProvider } from './context/HomeContext'
import DashboardAdmin from './components/pages/dashboard/DashboardAdmin'
import Login from './components/pages/login/Login'
import MainDrawer from './components/nav/MainDrawer'
import MegaGoDashboard from './components/pages/mega-go-dashboard/MegaGoDashboard'
import useScreenDimensions from './hooks/useScreenDimensions'
import FixedDrawer from './components/nav/FixedDrawer'

const AppRouting = () => {
  const [width] = useScreenDimensions()

  const [auth, setAuth] = useContext(HomeContext)

  return (
    <>
      <HomeProvider value={[auth, setAuth]}>
      <Routes>
        <Route path="/iniciar-sesion" element={<Login />} />
          <Route element={width < 780 ? <MainDrawer /> : <FixedDrawer />}>
          <Route exact path="/inicio" element={<Home />} />
          <Route path='/reporte-mega-go' element={<MegaGoDashboard />} />
          <Route path='/crear-usuario' element={<CreateUser />} />
          <Route path='/eliminar-usuario' element={<DeleteUser />} />
          <Route path='/editar-perfil' element={<EditProfile />} />
          <Route path='/dashboard' element={<DashboardAdmin />} />
        </Route>
        <Route
        path="*"
        element={<Navigate to="/iniciar-sesion" replace />}
    />
      </Routes>
      </HomeProvider>
      {/* <Footer/> */}
    </>
  )
}

export default AppRouting