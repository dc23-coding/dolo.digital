import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Import your page components
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Loads from './pages/Loads.vue'
import RouteCalculator from './pages/RouteCalculator.vue'
import Profile from './pages/Profile.vue'
import './styles.css';       // ← Tailwind baseline


// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/loads', component: Loads },
    { path: '/route-calculator', component: RouteCalculator },
    { path: '/profile', component: Profile }
  ]
})

const app = createApp(App)
app.use(router)

// Add theme provider
app.provide('theme', {
  current: localStorage.getItem('theme') || 'light',
  toggle() {
    this.current = this.current === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', this.current === 'dark')
    localStorage.setItem('theme', this.current)
  }
})

app.mount('#app')