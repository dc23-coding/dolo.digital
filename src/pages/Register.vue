<template>
  <div class="p-4 max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">Create Your Account</h2>

    <div class="mb-4">
      <label class="block mb-2">Email</label>
      <input v-model="email" type="email" class="w-full p-2 border rounded" placeholder="you@example.com" />
    </div>

    <div class="mb-4">
      <label class="block mb-2">Password</label>
      <input v-model="password" type="password" class="w-full p-2 border rounded" placeholder="Password" />
    </div>

    <div class="mb-4">
      <label class="block mb-2">Full Name</label>
      <input v-model="fullName" type="text" class="w-full p-2 border rounded" placeholder="Your Full Name" />
    </div>

    <div class="mb-4">
      <label class="block mb-2">Phone Number</label>
      <input v-model="phoneNumber" type="tel" class="w-full p-2 border rounded" placeholder="Optional" />
    </div>

    <button
      @click="register"
      class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow w-full transition transform hover:scale-105 active:scale-95"
    >
      Create Account
    </button>

    <p v-if="error" class="mt-4 text-red-500 text-center">{{ error }}</p>
  </div>
</template>

<script>
import { supabase } from '../lib/supabase';

export default {
  data() {
    return {
      email: '',
      password: '',
      fullName: '',
      phoneNumber: '',
      error: null,
    };
  },
  methods: {
    async register() {
      this.error = null;
      const { data, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password,
      });

      if (error) {
        this.error = error.message;
        return;
      }

      // Insert user profile data into dolo_users
      const { error: profileError } = await supabase.from('dolo_users').insert([{
        id: data.user.id,
        email: this.email,
        full_name: this.fullName,
        phone_number: this.phoneNumber,
      }]);

      if (profileError) {
        this.error = profileError.message;
        return;
      }

      this.$router.push('/');
    },
  },
};
</script>
