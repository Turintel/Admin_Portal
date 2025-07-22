<template>
  <div id="app">
    <AppSidebar />
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
import AppSidebar from './components/AppSidebar.vue'

export default {
  name: 'App',
  components: {
    ActiveOrders,
    ArchivedOrders,
    AppSidebar, 
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
}

.app-main {
  flex: 1;
  margin-left: 256px; /* Sidebar width */
  background-color: #F8FAFC;
}
</style>