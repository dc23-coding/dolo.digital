<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
    aria-label="Toggle theme"
  >
    <span v-if="isDark">
      <!-- Dark mode: show moon icon -->
      🌙
    </span>
    <span v-else>
      <!-- Light mode: show sun icon -->
      ☀️
    </span>
  </button>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// Reactive theme state: 'light' or 'dark'
const theme = ref('light')

// Initialize from localStorage or OS preference
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('theme')
  if (stored === 'dark' || stored === 'light') {
    theme.value = stored
  } else {
    theme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
}

// Computed flag
const isDark = computed(() => theme.value === 'dark')

// Function to apply HTML class and persist
function applyTheme(value) {
  document.documentElement.classList.toggle('dark', value === 'dark')
  localStorage.setItem('theme', value)
}

// Apply on mount
onMounted(() => {
  applyTheme(theme.value)
})

// Sync when theme changes
watch(theme, (newVal) => {
  applyTheme(newVal)
})

// Toggle handler
function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
</script>
