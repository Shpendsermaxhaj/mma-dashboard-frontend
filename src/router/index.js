import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import About from '@/views/About.vue'
import FighterProfile from '@/views/FighterProfile.vue'

const routes = [
  { path: '/', name: 'dashboard', component: Dashboard },
  { path: '/about', name: 'about', component: About },
  { path: '/fighter/:id', name: 'fighter-profile', component: FighterProfile },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
