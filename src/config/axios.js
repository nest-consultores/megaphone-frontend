import axios from 'axios'

/**
 * dashAxios es una instancia de axios con un baseURL predefinido, usado para realizar solicitudes HTTP a tu API
 */
const dashAxios = axios.create({
  // baseURL: 'https://megaphone-production.up.railway.app/api/v1/'
  baseURL: 'http://localhost:3003/api/v1/'
})

/**
 * Obtiene información desde un dashboard especificado.
 *
 * @param {string} url - La ruta en la API a la que se va a realizar la solicitud.
 * @param {string} role - El rol del usuario que está realizando la solicitud.
 * @param {string} query - Los datos adicionales para la consulta.
 * @param {string} token - El token JWT para autenticar al usuario.
 */
export const getDashboardQuery = async (url, role, query, token) => {
  const response = await dashAxios.get(`${url}/${role}/${query}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

/**
 * Crea una nueva cuenta de usuario.
 *
 * @param {string} url - La ruta en la API a la que se va a realizar la solicitud.
 * @param {Object} user - El objeto de usuario a crear.
 * @param {string} token - El token JWT para autenticar al usuario.
 */
export const createUserAccountQuery = async (url, user, token) => {
  const response = await dashAxios.post(url, user, token, {
    headers: {
      Authorization: `Bearer ${token} `
    }
  })
  return response
}

/**
 * Inicia sesión con una cuenta de usuario existente.
 *
 * @param {string} url - La ruta en la API a la que se va a realizar la solicitud.
 * @param {Object} user - El objeto de usuario con las credenciales de inicio de sesión.
 */
export const queryLogin = async (url, user) => {
  const login = await dashAxios.post(url, user)
  return login
}

/**
 * Obtiene todos los usuarios.
 *
 * @param {string} url - La ruta en la API a la que se va a realizar la solicitud.
 */
export const getAllUsersQuery = async (url) => {
  const response = await dashAxios.get(url)
  return response.data
}

/**
 * Edita el perfil de un usuario.
 *
 * @param {string} url - La ruta en la API a la que se va a realizar la solicitud.
 * @param {Object} user - El objeto de usuario con los nuevos datos del perfil.
 * @param {string} token - El token JWT para autenticar al usuario.
 */
export const editProfileQuery = async (url, user, token) => {
  const login = await dashAxios.put(url, user, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return login
}

/**
 * Crea o edita un dashboard.
 *
 * @param {string} url - La ruta en la API a la que se va a realizar la solicitud.
 * @param {Object} dashboard - El objeto de dashboard a crear o editar.
 * @param {string} token - El token JWT para autenticar al usuario.
 */
export const createOrEditDashboardQuery = async (url, dashboard, token) => {
  const response = await dashAxios.post(url, dashboard, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response
}

/**
 * Elimina una cuenta de usuario.
 *
 * @param {string} url - La ruta en la API a la que se va a realizar la solicitud.
 * @param {Object} user - El objeto de usuario que está realizando la acción.
 * @param {string} userRole - El rol del usuario que está realizando la acción.
 * @param {string} emailToDelete - El correo electrónico del usuario a eliminar.
 * @param {string} token - El token JWT para autenticar al usuario.
 */
export const deleteAccountQuery = async (url, user, userRole, emailToDelete, token) => {
  const data = await dashAxios.delete(`${url}/${user}/${userRole}/${emailToDelete}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  
  return data
}



export default dashAxios