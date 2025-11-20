<template>
  <div class="input-container">
    <div class="input-group">
      <label for="num1">First number</label>
      <input
        id="num1"
        type="number"
        :value="num1"
        @input="$emit('update:num1', parseFloat($event.target.value) || 0)"
        step="any"
        placeholder="0"
        :disabled="disabled"
      />
    </div>

    <div class="input-group">
      <label for="num2">Second number</label>
      <input
        id="num2"
        type="number"
        :value="num2"
        @input="$emit('update:num2', parseFloat($event.target.value) || 0)"
        step="any"
        placeholder="0"
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
  gap: 16px;
  margin-bottom: 24px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  color: #6b7280;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.2px;
  padding-left: 4px;
}

input[type="number"] {
  padding: 14px 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  font-size: 16px;
  color: #111827;
  background: #ffffff;
  transition: all 0.2s ease;
  font-variant-numeric: tabular-nums;
}

input[type="number"]::placeholder {
  color: #d1d5db;
}

input[type="number"]:hover:not(:disabled) {
  border-color: #d1d5db;
}

input[type="number"]:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

input[type="number"]:disabled {
  background-color: #f9fafb;
  color: #9ca3af;
  cursor: not-allowed;
  border-color: #e5e7eb;
}

/* Ocultar flechas de número en Chrome, Safari, Edge */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Ocultar flechas de número en Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
