import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

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
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error || 'Error al realizar la operación')
      }
      throw new Error('Error de conexión con el servidor')
    }
  }
}
