import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginForm from '@/components/LoginForm.vue'
import LandingView from '@/views/LandingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginForm
    },
    {
      path: '/product/:id',
      name: 'product-details',
      component: () => import('../views/ProductDetails.vue')
    },
    {
      path: '/sell',
      name: 'product-registration',
      component: () => import('../views/ProductRegistration.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.name !== 'login' && !authStore.isLoggedIn) {
    next({ name: 'login'})
  } else {
    next()
  }
})

export default router
