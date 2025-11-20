<template>
  <div class="display-container">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      Calculando...
    </div>
    
    <div v-else-if="error" class="resultado error">
      <h2>❌ Error</h2>
      <p>{{ error }}</p>
    </div>
    
    <div v-else-if="resultado !== null" class="resultado success">
      <h2>✅ Resultado</h2>
      <p class="resultado-valor">{{ formatearNumero(resultado) }}</p>
    </div>
    
    <div v-else class="resultado placeholder">
      <p>Selecciona una operación</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Display',
  props: {
    num1: {
      type: Number,
      default: 0
    },
    num2: {
      type: Number,
      default: 0
    },
    resultado: {
      type: Number,
      default: null
    },
    error: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    formatearNumero(num) {
      if (num === null || num === undefined) return '0'
      return parseFloat(num).toFixed(4)
    }
  }
}
</script>

<style scoped>
.display-container {
  margin-bottom: 20px;
}

.resultado {
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: white;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.resultado.success {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.resultado.error {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.resultado.placeholder {
  background: linear-gradient(135deg, #868f96 0%, #596164 100%);
}

.resultado h2 {
  font-size: 1.3em;
  margin-bottom: 10px;
}

.resultado-valor {
  font-size: 2.5em;
  font-weight: bold;
  margin: 0;
}

.loading {
  padding: 20px;
  text-align: center;
  color: #667eea;
  font-size: 1.2em;
  font-weight: 600;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
