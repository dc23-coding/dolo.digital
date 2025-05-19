<template>
  <aside class="w-64 bg-gray-800 text-white min-h-screen p-4 flex flex-col">
    <img src="/assets/dolo.png" alt="Dolo Logo" class="h-12 w-12 mb-6" />
    <nav class="space-y-2 flex flex-col">
      <router-link to="/" class="block py-2 px-4 rounded hover:bg-gray-700">Home</router-link>
      <router-link to="/loads" class="block py-2 px-4 rounded hover:bg-gray-700">Trip Planner</router-link>
      <router-link to="/route-calculator" class="block py-2 px-4 rounded hover:bg-gray-700">Route Calculator</router-link>
      <router-link to="/profile" class="block py-2 px-4 rounded hover:bg-gray-700">Profile</router-link>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      hovered: null,
      navLinks: [
        { to: '/', label: 'Home' },
        { to: '/loads', label: 'My Loads' },
        { to: '/route-calculator', label: 'Route Calculator' },
        { to: '/profile', label: 'Profile' },
      ],
    };
  },
};
</script>
