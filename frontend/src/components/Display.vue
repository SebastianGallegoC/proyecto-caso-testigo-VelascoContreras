<template>
  <div class="display-container">
    <div class="brand">
      <svg class="logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 7H7V9H9V7Z" fill="currentColor"/>
        <path d="M13 15H11V17H13V15Z" fill="currentColor"/>
        <path d="M15 15H17V17H15V15Z" fill="currentColor"/>
        <path d="M9 11H7V13H9V11Z" fill="currentColor"/>
        <path d="M13 7H11V9H13V7Z" fill="currentColor"/>
        <path d="M9 15H7V17H9V15Z" fill="currentColor"/>
        <path d="M13 11H11V13H13V11Z" fill="currentColor"/>
        <path d="M17 7H15V9H17V7Z" fill="currentColor"/>
        <path d="M17 11H15V13H17V11Z" fill="currentColor"/>
      </svg>
      <span class="brand-name">Calculator</span>
    </div>
    
    <div class="display-screen">
      <div v-if="loading" class="display-content loading-state">
        <div class="spinner"></div>
        <span class="loading-text">Calculating...</span>
      </div>
      
      <div v-else-if="error" class="display-content error-state">
        <div class="error-icon">!</div>
        <div class="error-message">{{ error }}</div>
      </div>
      
      <div v-else-if="resultado !== null" class="display-content result-state">
        <div class="result-value">{{ formatearNumero(resultado) }}</div>
      </div>
      
      <div v-else class="display-content placeholder-state">
        <div class="placeholder-text">0</div>
      </div>
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
      const formatted = parseFloat(num)
      
      // Si es un número muy grande o muy pequeño, usar notación científica
      if (Math.abs(formatted) > 999999999 || (Math.abs(formatted) < 0.0001 && formatted !== 0)) {
        return formatted.toExponential(4)
      }
      
      // Limitar decimales para números normales
      if (formatted % 1 === 0) {
        return formatted.toLocaleString()
      }
      return formatted.toLocaleString(undefined, { maximumFractionDigits: 6 })
    }
  }
}
</script>

<style scoped>
.display-container {
  margin-bottom: 28px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding: 0 4px;
}

.logo {
  width: 20px;
  height: 20px;
  color: #1f2937;
}

.brand-name {
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  letter-spacing: 0.3px;
}

.display-screen {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px 20px;
  min-height: 100px;
  transition: all 0.2s ease;
}

.display-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  min-height: 52px;
}

.result-value,
.placeholder-text {
  font-size: 48px;
  font-weight: 300;
  color: #111827;
  letter-spacing: -1px;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  transition: all 0.3s ease;
}

.placeholder-text {
  color: #9ca3af;
}

.loading-state {
  align-items: center;
  gap: 12px;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.error-state {
  align-items: center;
  gap: 8px;
}

.error-icon {
  width: 32px;
  height: 32px;
  background: #fee2e2;
  color: #dc2626;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
}

.error-message {
  font-size: 13px;
  color: #dc2626;
  text-align: center;
  font-weight: 500;
}

@media (max-width: 480px) {
  .result-value,
  .placeholder-text {
    font-size: 40px;
  }
  
  .display-screen {
    padding: 20px 16px;
  }
}
</style>
