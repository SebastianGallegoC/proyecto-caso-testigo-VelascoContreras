<template>
  <div class="input-container">
    <div class="input-group">
      <label for="num1">Primer número:</label>
      <input
        id="num1"
        type="number"
        :value="num1"
        @input="$emit('update:num1', parseFloat($event.target.value) || 0)"
        step="any"
        placeholder="Ingrese el primer número"
        :disabled="disabled"
      />
    </div>

    <div class="input-group">
      <label for="num2">Segundo número:</label>
      <input
        id="num2"
        type="number"
        :value="num2"
        @input="$emit('update:num2', parseFloat($event.target.value) || 0)"
        step="any"
        placeholder="Ingrese el segundo número"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    num1: {
      type: Number,
      default: 0
    },
    num2: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:num1', 'update:num2']
}
</script>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  color: #555;
  font-weight: 600;
  font-size: 0.9em;
}

input[type="number"] {
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1.1em;
  transition: all 0.3s ease;
}

input[type="number"]:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

input[type="number"]:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
</style>
