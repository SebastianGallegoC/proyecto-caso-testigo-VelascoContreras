<script setup>
import Calculadora from './components/Calculadora.vue'
</script>

<template>
  <div id="app">
    <Calculadora />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

#app {
  width: 100%;
}

@media (max-width: 600px) {
  body {
    padding: 10px;
  }
}
</style>
