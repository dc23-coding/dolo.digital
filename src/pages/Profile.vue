<template>
  <div class="p-4 max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">Profile</h2>
    <div class="bg-white p-4 rounded shadow mb-4">
      <p>Email: {{ user?.email }}</p>
      <p>Earnings: $12,345 (Last 30 days)</p>
    </div>

    <div class="mb-4">
      <label class="block mb-2">Saved Address</label>
      <ReusableAddressAutocomplete v-model="address" placeholder="Enter your address" />
    </div>

    <button
      @click="saveProfile"
      class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow transition transform hover:scale-105 active:scale-95 w-full"
    >
      Save Profile
    </button>

    <button
      @click="logout"
      class="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow transition transform hover:scale-105 active:scale-95 w-full mt-4"
    >
      Log Out
    </button>
  </div>
</template>

<script>
import { supabase } from '../supabase';
import ReusableAddressAutocomplete from '../components/ReusableAddressAutocomplete.vue';

export default {
  components: { ReusableAddressAutocomplete },
  data() {
    return {
      user: null,
      address: '',
    };
  },
  async created() {
    const { data: { user } } = await supabase.auth.getUser();
    this.user = user;
  },
  methods: {
    saveProfile() {
      alert(`Profile saved with address: ${this.address}`);
      // Future: Save to Supabase user profile table
    },
    async logout() {
      await supabase.auth.signOut();
      this.$router.push('/');
    },
  },
};
</script>
