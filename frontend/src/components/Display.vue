<template>
  <div class="display-container">
    <div class="display-screen">
      <div class="display-operation" v-if="operation && previousValue !== null">
        {{ formatearNumero(previousValue) }} {{ getOperationSymbol(operation) }}
      </div>
      
      <div v-if="loading" class="display-content loading-state">
        <div class="spinner"></div>
      </div>
      
      <div v-else-if="error" class="display-content error-state">
        <div class="error-message">{{ error }}</div>
      </div>
      
      <div v-else class="display-value">
        {{ displayValue }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Display',
  props: {
    displayValue: {
      type: String,
      default: '0'
    },
    operation: {
      type: String,
      default: null
    },
    previousValue: {
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
      const formatted = parseFloat(num)
      
      if (Math.abs(formatted) > 999999999 || (Math.abs(formatted) < 0.0001 && formatted !== 0)) {
        return formatted.toExponential(4)
      }
      
      if (formatted % 1 === 0) {
        return formatted.toLocaleString()
      }
      return formatted.toLocaleString(undefined, { maximumFractionDigits: 8 })
    },
    getOperationSymbol(op) {
      const symbols = {
        'sumar': '+',
        'restar': '−',
        'multiplicar': '×',
        'dividir': '÷'
      }
      return symbols[op] || ''
    }
  }
}
</script>

<style scoped>
.display-container {
  margin-bottom: 20px;
}

.display-screen {
  background: linear-gradient(to bottom, #4a5568, #2d3748);
  border-radius: 12px;
  padding: 20px 18px;
  min-height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  box-shadow: 
    inset 0 2px 8px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.display-operation {
  color: #a0aec0;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 4px;
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
}

.display-value {
  color: #e8f5e9;
  font-size: 36px;
  font-weight: 300;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(232, 245, 233, 0.5);
  word-break: break-all;
  text-align: right;
  width: 100%;
}

.display-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.loading-state {
  gap: 12px;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(232, 245, 233, 0.3);
  border-top-color: #e8f5e9;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state {
  flex-direction: column;
  gap: 8px;
}

.error-message {
  color: #fc8181;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
}

@media (max-width: 768px) {
  .display-value {
    font-size: 32px;
  }
  
  .display-operation {
    font-size: 14px;
  }
}
</style>
