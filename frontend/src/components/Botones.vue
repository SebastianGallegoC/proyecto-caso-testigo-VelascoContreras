<template>
  <div class="botones-container">
    <button 
      class="btn btn-sumar" 
      @click="$emit('calcular', 'sumar')"
      :disabled="disabled"
    >
      ➕ Sumar
    </button>
    
    <button 
      class="btn btn-restar" 
      @click="$emit('calcular', 'restar')"
      :disabled="disabled"
    >
      ➖ Restar
    </button>
    
    <button 
      class="btn btn-multiplicar" 
      @click="$emit('calcular', 'multiplicar')"
      :disabled="disabled"
    >
      ✖️ Multiplicar
    </button>
    
    <button 
      class="btn btn-dividir" 
      @click="$emit('calcular', 'dividir')"
      :disabled="disabled"
    >
      ➗ Dividir
    </button>
  </div>
</template>

<script>
export default {
  name: 'Botones',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['calcular']
}
</script>

<style scoped>
.botones-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.btn {
  padding: 15px;
  border: none;
  border-radius: 10px;
  font-size: 1.1em;
  font-weight: 600;
  color: white;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.btn-sumar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.btn-restar {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.btn-multiplicar {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.btn-dividir {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

@media (max-width: 480px) {
  .botones-container {
    grid-template-columns: 1fr;
  }
}
</style>
