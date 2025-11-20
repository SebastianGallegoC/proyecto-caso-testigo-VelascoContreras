import axios from 'axios'

// Obtener la URL base del API
// En desarrollo usa la variable de entorno
// En producción, usa el mismo host pero puerto 8000
const getApiBaseUrl = () => {
  // Si hay variable de entorno definida, usarla
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  
  // Si estamos en el navegador, usar el mismo host
  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location
    // Si estamos en localhost, usar puerto 8000
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `${protocol}//${hostname}:8000`
    }
    // Si estamos en producción, usar el mismo host con puerto 8000
    return `${protocol}//${hostname}:8000`
  }
  
  // Fallback
  return 'http://localhost:8000'
}

const API_BASE_URL = getApiBaseUrl()

console.log('API Base URL:', API_BASE_URL)

export const calculadoraAPI = {
  async calcular(num1, num2, operacion) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/calcular/`, {
        num1,
        num2,
        operacion
      })
      return response.data
    } catch (error) {
      console.error('Error en la petición:', error)
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error || 'Error al realizar la operación')
      }
      throw new Error('Error de conexión con el servidor')
    }
  }
}

