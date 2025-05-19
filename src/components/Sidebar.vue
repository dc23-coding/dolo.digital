<template>
  <aside
    class="fixed top-16 bottom-0 left-0 w-64
           bg-[#2E2E2E] dark:bg-[#1F1F1F]
           text-foreground
           border-r border-border
           flex flex-col p-4 space-y-4
           z-40"
  >
    <nav class="space-y-1 flex-1 overflow-y-auto">
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
    <div class="mt-auto">
      <!-- Footer or secondary items here -->
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      navLinks: [
        { to: '/', label: 'Home' },
        { to: '/loads', label: 'Trip Planning' },
        { to: '/route-calculator', label: 'Route Calculator' },
        { to: '/profile', label: 'Profile' }
      ]
    }
  }
}
</script>

<style scoped>
/* No additional styles needed—Tailwind utilities handle layout */
</style>
