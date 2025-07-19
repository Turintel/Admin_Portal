<template>
  <div id="app">
    <header class="app-header">
      <h1>Admin Portal</h1>
      <nav class="nav">
        <button 
          :class="{ active: currentView === 'active-orders' }" 
          @click="currentView = 'active-orders'"
          class="nav-btn"
        >
          Active Orders
        </button>
        <button 
          :class="{ active: currentView === 'archived-orders' }" 
          @click="currentView = 'archived-orders'"
          class="nav-btn"
        >
          Archived Orders
        </button>
      </nav>
    </header>
    
    <main class="app-main">
      <ActiveOrders 
        v-if="currentView === 'active-orders'" 
        @switch-to-archived="currentView = 'archived-orders'"
      />
      <ArchivedOrders 
        v-if="currentView === 'archived-orders'" 
        @switch-to-active="currentView = 'active-orders'"
      />
    </main>
  </div>
</template>

<script>
import ActiveOrders from './components/ActiveOrders.vue'
import ArchivedOrders from './components/ArchivedOrders.vue'

export default {
  name: 'App',
  components: {
    ActiveOrders,
    ArchivedOrders
  },
  data() {
    return {
      currentView: 'active-orders' // Default to Active Orders as required
    }
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

body {
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #F8FAFC;
  color: #1E293B;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #1E293B;
  color: white;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.app-header h1 {
  font-family: 'Manrope', sans-serif;
  font-size: 24px;
  font-weight: 700;
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
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.nav-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-btn.active {
  background-color: #EF4444;
}

.app-main {
  flex: 1;
  background-color: #F8FAFC;
}
</style>
