<script setup>
import Calculadora from './components/Calculadora.vue'
</script>

<template>
  <div id="app">
    <h1>🔢 Calculadora</h1>
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
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

#app {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 30px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2em;
}

@media (max-width: 600px) {
  #app {
    padding: 20px;
  }
  
  h1 {
    font-size: 1.5em;
    margin-bottom: 20px;
  }
}
</style>
