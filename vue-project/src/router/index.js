import { createRouter, createWebHistory } from 'vue-router'
import WordApp from '../components/WordApp.vue'
import Favorites from '../components/Favorites.vue'

const routes = [
  { path: '/', component: WordApp },
  { path: '/favorites', component: Favorites }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router