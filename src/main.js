import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

// Configure persisted state plugin
pinia.use(createPersistedState({
  storage: localStorage,
  auto: true
}))

app.use(pinia)
app.mount('#app')
