<template>
  <div id="app">
    <Orders />
  </div>
</template>

<script>
import Orders from './components/Orders.vue'

export default {
  name: 'App',
  components: {
    Orders
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Manrope', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
}
</style>
