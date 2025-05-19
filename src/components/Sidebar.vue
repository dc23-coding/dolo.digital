<template>
  <aside class="sidebar fixed top-16 left-0 h-[calc(100vh-4rem)] p-4 bg-slate-50 dark:bg-slate-800 shadow-sm z-30">
    <nav class="space-y-1">
      <router-link
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="block px-3 py-2 rounded-md text-sm font-medium transition-colors"
        :class="{
          'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300': $route.path === link.to,
          'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700': $route.path !== link.to
        }"
      >
        {{ link.label }}
      </router-link>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      navLinks: [
        { to: '/', label: 'Home' },
        { to: '/loads', label: 'Loads' },
        { to: '/route-calculator', label: 'Route Calculator' },
        { to: '/profile', label: 'Profile' }
      ]
    }
  }
}
</script>