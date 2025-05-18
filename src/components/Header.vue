<template>
    <header class="bg-white shadow p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">Dolo</h1>
      <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </header>
  </template>
  
  <script>
  import { supabase } from '../supabase';
  
  export default {
    methods: {
      async logout() {
        await supabase.auth.signOut();
        this.$router.push('/login');
      },
    },
  };
  </script>