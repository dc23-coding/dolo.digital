<template>
  <div class="min-h-screen bg-gray-100 flex">
    <Sidebar />
    <div class="flex-1">
      <Header />
      <main class="p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';

export default {
  components: { Sidebar, Header },
};
</script>