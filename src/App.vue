<template>
  <Header />
  <Sidebar />
  <main class="pt-16 pl-56"> <!-- Adjust padding to match sidebar width -->
    <router-view />
  </main>
</template>

<script>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  components: { Header, Sidebar }
}
</script>