import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HabitsPage from '../views/HabitsPage.vue'
import AuthPage from '../views/AuthPage.vue'
import GoogleCallback from '../components/GoogleCallback.vue'
import { useAuthStore } from '@/stores/auth'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: to => {
      return { path: '/habits' }
    },
  },
  {
    path: '/habits',
    name: 'habits',
    component: HabitsPage,
    beforeEnter(to,from){
      const authStore = useAuthStore()
      console.log('authStore.loggedIn', authStore.loggedIn)
      if (! authStore.loggedIn) return {name: 'auth'}
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthPage,
    beforeEnter(to,from){
      const authStore = useAuthStore()
      console.log('authStore.loggedIn', authStore.loggedIn)
      if (authStore.loggedIn) return {name: 'habits'}
    }
  },
  {
    path: '/auth/google-callback',
    name: 'google-callnack',
    component: GoogleCallback
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
