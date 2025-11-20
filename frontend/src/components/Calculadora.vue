<template>
  <div class="calculadora-container">
    <div class="calculadora-card">
      <Display 
        :num1="num1" 
        :num2="num2" 
        :resultado="resultado" 
        :error="error"
        :loading="loading"
      />
      
      <Input 
        v-model:num1="num1" 
        v-model:num2="num2"
        :disabled="loading"
      />
      
      <Botones 
        @calcular="calcular"
        :disabled="loading"
      />
      
      <Historial :historial="historial" @limpiar="limpiarHistorial" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Display from './Display.vue'
import Input from './Input.vue'
import Botones from './Botones.vue'
import Historial from './Historial.vue'
import { calculadoraAPI } from '../services/api'

export default {
  name: 'Calculadora',
  components: {
    Display,
    Input,
    Botones,
    Historial
  },
  setup() {
    const num1 = ref(0)
    const num2 = ref(0)
    const resultado = ref(null)
    const error = ref(null)
    const loading = ref(false)
    const historial = ref([])

    const calcular = async (operacion) => {
      error.value = null
      resultado.value = null
      loading.value = true

      try {
        const data = await calculadoraAPI.calcular(
          parseFloat(num1.value),
          parseFloat(num2.value),
          operacion
        )
        
        resultado.value = data.resultado
        agregarAlHistorial(data)
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    const agregarAlHistorial = (data) => {
      const simbolos = {
        'sumar': '+',
        'restar': '-',
        'multiplicar': '×',
        'dividir': '÷'
      }

      const item = {
        num1: data.num1,
        num2: data.num2,
        operacion: data.operacion,
        simbolo: simbolos[data.operacion],
        resultado: data.resultado,
        timestamp: new Date()
      }

      historial.value.unshift(item)
      if (historial.value.length > 10) {
        historial.value.pop()
      }
    }

    const limpiarHistorial = () => {
      historial.value = []
    }

    return {
      num1,
      num2,
      resultado,
      error,
      loading,
      historial,
      calcular,
      limpiarHistorial
    }
  }
}
</script>

<style scoped>
.calculadora-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.calculadora-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 40px;
  max-width: 500px;
  width: 100%;
}

@media (max-width: 768px) {
  .calculadora-card {
    padding: 20px;
  }
}
</style>
