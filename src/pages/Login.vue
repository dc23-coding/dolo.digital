<template>
  <div class="p-4 max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">Login to Your Account</h2>

    <div class="mb-4">
      <label class="block mb-2">Email</label>
      <input v-model="email" type="email" class="w-full p-2 border rounded" placeholder="you@example.com" />
    </div>

    <div class="mb-4">
      <label class="block mb-2">Password</label>
      <input v-model="password" type="password" class="w-full p-2 border rounded" placeholder="Password" />
    </div>

    <button
      @click="login"
      class="bg-primary text-white px-6 py-3 rounded w-full hover:opacity-90 transition"
    >
      Login
    </button>

    <p v-if="error" class="mt-4 text-red-500 text-center">{{ error }}</p>
    <p class="mt-4 text-center">
      Don’t have an account?
      <router-link to="/register" class="text-primary underline">Create one</router-link>
    </p>
  </div>
</template>

<script>
import { supabase } from '@/lib/supabase';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      this.error = null;
      const { error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password,
      });
      if (error) this.error = error.message;
      else this.$router.push('/');
    },
  },
};
</script>
