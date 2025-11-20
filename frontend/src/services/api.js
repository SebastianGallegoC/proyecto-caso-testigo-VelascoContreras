import axios from 'axios'

// Obtener la URL base del API dinámicamente
// Usa el mismo host que el navegador ve, pero puerto 8000
const getApiBaseUrl = () => {
  // Si hay variable de entorno definida, usarla (para desarrollo local)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  
  // En el navegador, detectar automáticamente usando window.location
  // Esto funciona tanto en localhost como en producción
  if (typeof window !== 'undefined' && window.location) {
    const protocol = window.location.protocol // 'http:' o 'https:'
    const hostname = window.location.hostname // IP o dominio que el usuario ve
    const apiUrl = `${protocol}//${hostname}:8000`
    return apiUrl
  }
  
  // Fallback para SSR o casos edge
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

