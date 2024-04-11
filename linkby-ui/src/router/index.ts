import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginForm from '@/components/LoginForm.vue'
import LandingView from '@/views/LandingView.vue'
import ProductRegistration from '@/views/ProductRegistration.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/sell',
      name: 'product-registration',
      component: ProductRegistration
    },
    {
      path: '/login',
      name: 'login',
      component: LoginForm
    },
    {
      path: '/product/:prodId',
      name: 'product-details',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProductDetails.vue')
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
