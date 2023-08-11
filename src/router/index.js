import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/homePage.vue'),
  },
  {
    path: '/transfer',
    component: () => import('@/views/transferTest.vue'),
  },
  {
    path: '/horizontal-calendar',
    component: () => import('@/views/horizontalCalendarTest.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router
