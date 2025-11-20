<template>
  <div class="historial-container">
    <h3>📋 Historial</h3>
    
    <div class="historial-lista">
      <div v-if="historial.length === 0" class="historial-vacio">
        No hay operaciones aún
      </div>
      
      <div 
        v-for="(item, index) in historial" 
        :key="index"
        class="historial-item"
      >
        {{ item.num1 }} {{ item.simbolo }} {{ item.num2 }} = {{ formatearNumero(item.resultado) }}
      </div>
    </div>
    
    <button 
      v-if="historial.length > 0"
      class="btn-limpiar" 
      @click="confirmarLimpiar"
    >
      🗑️ Limpiar Historial
    </button>
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
      return parseFloat(num).toFixed(4)
    },
    confirmarLimpiar() {
      if (confirm('¿Está seguro de que desea limpiar el historial?')) {
        this.$emit('limpiar')
      }
    }
  }
}
</script>

<style scoped>
.historial-container {
  margin-top: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
}

h3 {
  color: #667eea;
  margin-bottom: 15px;
  text-align: center;
}

.historial-lista {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.historial-vacio {
  text-align: center;
  color: #999;
  font-style: italic;
  padding: 20px;
}

.historial-item {
  padding: 10px;
  background: white;
  border-radius: 5px;
  margin-bottom: 8px;
  color: #555;
  border-left: 4px solid #667eea;
  transition: all 0.2s ease;
}

.historial-item:hover {
  background: #f0f0f0;
  transform: translateX(5px);
}

.btn-limpiar {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #868f96 0%, #596164 100%);
}
</style>
