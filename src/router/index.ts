import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      component: () => import('../views/CommonView.vue'),
      children: [
        {
          path: '',
          name: 'categories',
          meta: { requiresAuth: true },
          // route level code-splitting
          component: () => import('../views/CategoriesView.vue'),
        },
        {
          path: 'cart',
          name: 'cart',
          meta: { requiresAuth: true },
          component: () => import('../views/CartView.vue'),
        },
        {
          path: 'my-profile',
          name: 'myProfile',
          meta: { requiresAuth: true },
          component: () => import('../views/MyProfileView.vue'),
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

router.beforeResolve((to, from) => {
  const authStore = useAuthStore()
  console.log('beforeResolve', authStore.isUserLoggedIn)
  if (to.meta.requiresAuth && !authStore.isUserLoggedIn) {
    console.warn('The user is not authenticated')
    // TODO: make redirect to the login screen
    // return '/'
  }
})

export default router
