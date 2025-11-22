<template>
  <div class="calculadora-container">
    <div class="calculadora-card">
      <Display 
        :displayValue="displayValue"
        :operation="currentOperation"
        :previousValue="previousValue"
        :error="error"
        :loading="loading"
      />
      
      <Teclado 
        @number-click="handleNumberClick"
        @operator-click="handleOperatorClick"
        @equals-click="handleEqualsClick"
        @clear-click="handleClearClick"
        @decimal-click="handleDecimalClick"
        @backspace-click="handleBackspaceClick"
        :disabled="loading"
      />
      
      <Historial :historial="historial" @limpiar="limpiarHistorial" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Display from './Display.vue'
import Teclado from './Teclado.vue'
import Historial from './Historial.vue'
import { calculadoraAPI } from '../services/api'

export default {
  name: 'Calculadora',
  components: {
    Display,
    Teclado,
    Historial
  },
  setup() {
    const displayValue = ref('0')
    const previousValue = ref(null)
    const currentOperation = ref(null)
    const waitingForOperand = ref(false)
    const error = ref(null)
    const loading = ref(false)
    const historial = ref([])

    const handleNumberClick = (number) => {
      error.value = null
      
      if (waitingForOperand.value) {
        displayValue.value = String(number)
        waitingForOperand.value = false
      } else {
        displayValue.value = displayValue.value === '0' 
          ? String(number) 
          : displayValue.value + number
      }
    }

    const handleDecimalClick = () => {
      error.value = null
      
      if (waitingForOperand.value) {
        displayValue.value = '0.'
        waitingForOperand.value = false
      } else if (displayValue.value.indexOf('.') === -1) {
        displayValue.value = displayValue.value + '.'
      }
    }

    const handleBackspaceClick = () => {
      error.value = null
      
      if (!waitingForOperand.value) {
        displayValue.value = displayValue.value.length > 1 
          ? displayValue.value.slice(0, -1)
          : '0'
      }
    }

    const handleOperatorClick = async (operacion) => {
      const inputValue = parseFloat(displayValue.value)

      if (previousValue.value === null) {
        previousValue.value = inputValue
      } else if (currentOperation.value) {
        // Si ya hay una operación pendiente, ejecutarla primero
        await executeOperation()
      }

      waitingForOperand.value = true
      currentOperation.value = operacion
    }

    const handleEqualsClick = async () => {
      if (currentOperation.value && previousValue.value !== null) {
        await executeOperation()
        currentOperation.value = null
      }
    }

    const executeOperation = async () => {
      const inputValue = parseFloat(displayValue.value)
      
      if (currentOperation.value && previousValue.value !== null) {
        error.value = null
        loading.value = true

        try {
          const data = await calculadoraAPI.calcular(
            previousValue.value,
            inputValue,
            currentOperation.value
          )
          
          displayValue.value = String(data.resultado)
          previousValue.value = data.resultado
          waitingForOperand.value = true
          
          agregarAlHistorial(data)
        } catch (err) {
          error.value = err.message
          displayValue.value = '0'
          previousValue.value = null
          currentOperation.value = null
          waitingForOperand.value = false
        } finally {
          loading.value = false
        }
      }
    }

    const handleClearClick = () => {
      displayValue.value = '0'
      previousValue.value = null
      currentOperation.value = null
      waitingForOperand.value = false
      error.value = null
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
      displayValue,
      previousValue,
      currentOperation,
      error,
      loading,
      historial,
      handleNumberClick,
      handleOperatorClick,
      handleEqualsClick,
      handleClearClick,
      handleDecimalClick,
      handleBackspaceClick,
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
  background: #2d2d2d;
  border-radius: 20px;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 10px 30px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  padding: 24px;
  max-width: 380px;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .calculadora-card {
    padding: 20px;
    border-radius: 16px;
  }
}
</style>
