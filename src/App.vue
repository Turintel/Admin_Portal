<template>
  <div id="app">
    <header class="app-header">
      <h1>Admin Portal</h1>
      <nav class="nav">
        <button 
          :class="{ active: currentView === 'orders' }" 
          @click="currentView = 'orders'"
          class="nav-btn"
        >
          Orders
        </button>
      </nav>
    </header>
    
    <main class="app-main">
      <Orders v-if="currentView === 'orders'" />
    </main>
  </div>
</template>

<script>
import Orders from './components/Orders.vue'

export default {
  name: 'App',
  components: {
    Orders
  },
  data() {
    return {
      currentView: 'orders'
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #2c3e50;
  color: white;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.app-header h1 {
  font-size: 24px;
  font-weight: 600;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav-btn {
  background: none;
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.nav-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-btn.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.app-main {
  flex: 1;
  padding: 20px;
}
</style>
