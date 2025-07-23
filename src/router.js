import { createRouter, createWebHistory } from 'vue-router';
import ActiveOrders from './components/ActiveOrders.vue';
import ArchivedOrders from './components/ArchivedOrders.vue';

const routes = [
  { path: '/active-orders', component: ActiveOrders },
  { path: '/archived-orders', component: ArchivedOrders },
];

const router = createRouter({
  history: createWebHistory(), // Use history mode for clean URLs
  routes,
});

export default router;