<template>
  <div class="botones-container">
    <button 
      class="btn btn-operation" 
      @click="$emit('calcular', 'sumar')"
      :disabled="disabled"
    >
      <span class="btn-icon">+</span>
      <span class="btn-label">Add</span>
    </button>
    
    <button 
      class="btn btn-operation" 
      @click="$emit('calcular', 'restar')"
      :disabled="disabled"
    >
      <span class="btn-icon">−</span>
      <span class="btn-label">Subtract</span>
    </button>
    
    <button 
      class="btn btn-operation" 
      @click="$emit('calcular', 'multiplicar')"
      :disabled="disabled"
    >
      <span class="btn-icon">×</span>
      <span class="btn-label">Multiply</span>
    </button>
    
    <button 
      class="btn btn-operation" 
      @click="$emit('calcular', 'dividir')"
      :disabled="disabled"
    >
      <span class="btn-icon">÷</span>
      <span class="btn-label">Divide</span>
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
  gap: 12px;
  margin-bottom: 24px;
}

.btn {
  padding: 18px 20px;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  background: #ffffff;
  color: #111827;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0) 100%);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.btn:hover:not(:disabled) {
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.btn:hover:not(:disabled)::before {
  opacity: 1;
}

.btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none !important;
  border-color: #e5e7eb;
}

.btn-icon {
  font-size: 24px;
  font-weight: 300;
  line-height: 1;
  color: #3b82f6;
}

.btn-label {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.btn:disabled .btn-icon,
.btn:disabled .btn-label {
  color: #9ca3af;
}

@media (max-width: 480px) {
  .botones-container {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .btn {
    padding: 16px 18px;
  }
}
</style>
