<template>
  <aside class="sidebar">
    <div class="logo">Turintel</div>
    <nav class="navigation">
      <a href="#" class="nav-link active">Orders</a>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'AppSidebar'
}
</script>

<style scoped>
.sidebar {
  width: 256px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #FFFFFF;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.logo {
  font-family: 'Manrope', sans-serif;
  font-size: 32px;
  font-weight: 800;
  color: #EF4444;
  margin-bottom: 40px;
}

.navigation {
  display: flex;
  flex-direction: column;
}

.nav-link {
  display: block;
  width: 100%;
  padding: 10px 15px;
  border-radius: 8px;
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #475569;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.nav-link:hover {
  background-color: #F1F5F9;
}

.nav-link.active {
  font-weight: 700;
  color: #EF4444;
  background-color: #FEE2E2;
}
</style>
