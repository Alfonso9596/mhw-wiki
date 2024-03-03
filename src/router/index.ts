// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    name: 'Home',
    label: 'navigation.home',
    path: '/',
    component: () => import('@/pages/Home.vue'),
    icon: 'mdi-home',
  },
  {
    name: 'Monster',
    label: 'navigation.monster',
    path: '/monster',
    component: () => import('@/pages/MonsterPage.vue'),
    icon: 'mdi-dice-1'
  },
  {
    name: 'MonsterDetail',
    path: '/monster/:id',
    component: () => import('@/pages/MonsterDetailPage.vue'),
    icon: 'mdi-dice-2'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export { routes };

export default router;
