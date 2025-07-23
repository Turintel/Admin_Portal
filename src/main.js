import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router'; // Import the router

const app = createApp(App);
const pinia = createPinia();

// Configure persisted state plugin
pinia.use(createPersistedState({
  storage: localStorage,
  auto: true,
}));

app.use(pinia);
app.use(router); // Use the router
app.mount('#app');