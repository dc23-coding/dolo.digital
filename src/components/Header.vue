<template>
  <header
    class="w-full flex items-center justify-between
           px-4 py-2
           bg-[#B0B7BE] dark:bg-[#7A848E]   /* steel grey */
           text-foreground
           border-b border-border
           shadow-sm"
  >
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