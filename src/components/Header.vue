<template>
  <header class="h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 fixed top-0 left-0 right-0 z-40">
    <div class="flex items-center space-x-4">
      <img src="/assets/dolo.png" alt="Logo" class="h-11 w-11">
      <h1 class="text-xl font-semibold">Dolo</h1>
    </div>
    
    <div class="flex items-center space-x-4">
      <ThemeToggle />
      <button
        @click="logout"
        class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors text-sm font-medium"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<script>
import ThemeToggle from './ThemeToggle.vue'
import { supabase } from '@/lib/supabase'

export default {
  components: { ThemeToggle },
  methods: {
    async logout() {
      await supabase.auth.signOut()
      this.$router.push('/login')
    }
  }
}
</script>