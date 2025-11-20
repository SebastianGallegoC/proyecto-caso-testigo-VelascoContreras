<template>
  <div class="historial-container">
    <div class="historial-header">
      <h3>History</h3>
      <button 
        v-if="historial.length > 0"
        class="btn-clear" 
        @click="confirmarLimpiar"
        title="Clear history"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
        </svg>
      </button>
    </div>
    
    <div class="historial-lista">
      <div v-if="historial.length === 0" class="historial-vacio">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 12h8M12 8v8"/>
        </svg>
        <span>No calculations yet</span>
      </div>
      
      <div 
        v-for="(item, index) in historial" 
        :key="index"
        class="historial-item"
      >
        <div class="operation">
          {{ item.num1 }} {{ item.simbolo }} {{ item.num2 }}
        </div>
        <div class="result">
          = {{ formatearNumero(item.resultado) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Historial',
  props: {
    historial: {
      type: Array,
      default: () => []
    }
  },
  emits: ['limpiar'],
  methods: {
    formatearNumero(num) {
      const formatted = parseFloat(num)
      if (formatted % 1 === 0) {
        return formatted.toLocaleString()
      }
      return formatted.toLocaleString(undefined, { maximumFractionDigits: 6 })
    },
    confirmarLimpiar() {
      this.$emit('limpiar')
    }
  }
}
</script>

<style scoped>
.historial-container {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

.historial-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

h3 {
  color: #111827;
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.2px;
}

.btn-clear {
  background: transparent;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-clear:hover {
  background: #f3f4f6;
  color: #dc2626;
}

.btn-clear:active {
  background: #e5e7eb;
}

.historial-lista {
  max-height: 240px;
  overflow-y: auto;
  margin: 0;
}

/* Estilos personalizados para scrollbar */
.historial-lista::-webkit-scrollbar {
  width: 6px;
}

.historial-lista::-webkit-scrollbar-track {
  background: transparent;
}

.historial-lista::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.historial-lista::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.historial-vacio {
  text-align: center;
  color: #9ca3af;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.empty-icon {
  width: 48px;
  height: 48px;
  color: #d1d5db;
}

.historial-vacio span {
  font-size: 13px;
  font-weight: 500;
}

.historial-item {
  padding: 12px 16px;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  border: 1px solid #f3f4f6;
}

.historial-item:hover {
  background: #f3f4f6;
  border-color: #e5e7eb;
}

.operation {
  color: #6b7280;
  font-size: 13px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.result {
  color: #111827;
  font-size: 14px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

@media (max-width: 480px) {
  .historial-item {
    padding: 10px 12px;
  }
  
  .operation {
    font-size: 12px;
  }
  
  .result {
    font-size: 13px;
  }
}
</style>
