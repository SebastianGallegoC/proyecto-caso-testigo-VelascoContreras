<template>
  <div class="teclado-container">
    <button 
      class="btn btn-clear" 
      @click="$emit('clear-click')"
      :disabled="disabled"
    >
      AC
    </button>
    
    <button 
      class="btn btn-backspace" 
      @click="$emit('backspace-click')"
      :disabled="disabled"
    >
      ⌫
    </button>
    
    <button 
      class="btn btn-operator" 
      @click="$emit('operator-click', 'dividir')"
      :disabled="disabled"
    >
      ÷
    </button>
    
    <button 
      class="btn btn-number" 
      @click="$emit('number-click', 7)"
      :disabled="disabled"
    >
      7
    </button>
    
    <button 
      class="btn btn-number" 
      @click="$emit('number-click', 8)"
      :disabled="disabled"
    >
      8
    </button>
    
    <button 
      class="btn btn-number" 
      @click="$emit('number-click', 9)"
      :disabled="disabled"
    >
      9
    </button>
    
    <button 
      class="btn btn-operator" 
      @click="$emit('operator-click', 'multiplicar')"
      :disabled="disabled"
    >
      ×
    </button>
    
    <button 
      class="btn btn-number" 
      @click="$emit('number-click', 4)"
      :disabled="disabled"
    >
      4
    </button>
    
    <button 
      class="btn btn-number" 
      @click="$emit('number-click', 5)"
      :disabled="disabled"
    >
      5
    </button>
    
    <button 
      class="btn btn-number" 
      @click="$emit('number-click', 6)"
      :disabled="disabled"
    >
      6
    </button>
    
    <button 
      class="btn btn-operator" 
      @click="$emit('operator-click', 'restar')"
      :disabled="disabled"
    >
      −
    </button>
    
    <button 
      class="btn btn-number" 
      @click="$emit('number-click', 1)"
      :disabled="disabled"
    >
      1
    </button>
    
    <button 
      class="btn btn-number" 
      @click="$emit('number-click', 2)"
      :disabled="disabled"
    >
      2
    </button>
    
    <button 
      class="btn btn-number" 
      @click="$emit('number-click', 3)"
      :disabled="disabled"
    >
      3
    </button>
    
    <button 
      class="btn btn-operator" 
      @click="$emit('operator-click', 'sumar')"
      :disabled="disabled"
    >
      +
    </button>
    
    <button 
      class="btn btn-number btn-zero" 
      @click="$emit('number-click', 0)"
      :disabled="disabled"
    >
      0
    </button>
    
    <button 
      class="btn btn-decimal" 
      @click="$emit('decimal-click')"
      :disabled="disabled"
    >
      .
    </button>
    
    <button 
      class="btn btn-equals" 
      @click="$emit('equals-click')"
      :disabled="disabled"
    >
      =
    </button>
  </div>
</template>

<script>
export default {
  name: 'Teclado',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['number-click', 'operator-click', 'equals-click', 'clear-click', 'decimal-click', 'backspace-click']
}
</script>

<style scoped>
.teclado-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.btn {
  padding: 20px;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  user-select: none;
}

.btn:active:not(:disabled) {
  transform: translateY(1px);
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-number {
  background: linear-gradient(to bottom, #4a5568, #3a4556);
  color: #ffffff;
}

.btn-number:hover:not(:disabled) {
  background: linear-gradient(to bottom, #5a6578, #4a5566);
}

.btn-operator {
  background: linear-gradient(to bottom, #f59e0b, #d97706);
  color: #ffffff;
  font-size: 24px;
}

.btn-operator:hover:not(:disabled) {
  background: linear-gradient(to bottom, #fbbf24, #f59e0b);
}

.btn-equals {
  background: linear-gradient(to bottom, #10b981, #059669);
  color: #ffffff;
  font-size: 24px;
}

.btn-equals:hover:not(:disabled) {
  background: linear-gradient(to bottom, #34d399, #10b981);
}

.btn-clear {
  background: linear-gradient(to bottom, #ef4444, #dc2626);
  color: #ffffff;
  grid-column: span 2;
}

.btn-clear:hover:not(:disabled) {
  background: linear-gradient(to bottom, #f87171, #ef4444);
}

.btn-backspace {
  background: linear-gradient(to bottom, #6b7280, #4b5563);
  color: #ffffff;
  font-size: 22px;
}

.btn-backspace:hover:not(:disabled) {
  background: linear-gradient(to bottom, #9ca3af, #6b7280);
}

.btn-decimal {
  background: linear-gradient(to bottom, #4a5568, #3a4556);
  color: #ffffff;
  font-size: 28px;
}

.btn-decimal:hover:not(:disabled) {
  background: linear-gradient(to bottom, #5a6578, #4a5566);
}

.btn-zero {
  grid-column: span 2;
}

@media (max-width: 768px) {
  .btn {
    padding: 18px;
    font-size: 18px;
  }
  
  .btn-operator,
  .btn-equals {
    font-size: 22px;
  }
  
  .btn-decimal {
    font-size: 26px;
  }
}
</style>
