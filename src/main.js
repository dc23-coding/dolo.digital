// /src/main.js

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Home from './pages/Home.vue';
import Loads from './pages/Loads.vue';
import Profile from './pages/Profile.vue';
import RouteCalculator from './pages/RouteCalculator.vue';
import '../styles.css'; // ✅ Corrected import path
import OffersPage from './pages/OffersPage.vue';




const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/loads', component: Loads },
    { path: '/profile', component: Profile },
    { path: '/route-calculator', component: RouteCalculator },
    { path: '/offers/:vendor', component: OffersPage }, // ✅ Added
  ],
});

const app = createApp(App);
app.use(router);
app.mount('#app');
