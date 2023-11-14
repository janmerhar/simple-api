import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:page?',
      name: 'home',
      component: HomeView
    },
    {
      path: '/gallery/:page?',
      name: 'gallery',
      component: () => import('../views/GalleryView.vue')
    },
    { path: '/:pathMatch(.*)*', name: '404', component: () => import('../views/NotFoundView.vue') }
  ]
})

export default router
