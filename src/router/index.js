import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
      navlayout: 'left'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})
export { routes }
export default router
