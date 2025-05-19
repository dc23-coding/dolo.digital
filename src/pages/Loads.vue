<template>
  <div class="p-4 max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">Trip Planner</h2>

    <div class="mb-4">
      <label class="block mb-2">Origin</label>
      <ReusableAddressAutocomplete v-model="origin" placeholder="Origin Address" />
    </div>

    <div class="mb-4">
      <label class="block mb-2">Destination</label>
      <ReusableAddressAutocomplete v-model="destination" placeholder="Destination Address" />
    </div>

    <div class="mb-4">
      <label class="block mb-2">Distance (miles)</label>
      <input v-model.number="miles" type="number" class="w-full p-2 border rounded" placeholder="e.g., 850" />
    </div>

    <div v-if="miles" class="mb-4 p-2 bg-gray-100 rounded text-center">
      <p>Estimated Driving Time:</p>
      <p class="font-semibold">{{ calculateTime('truck') }} hours (Truck @ 50 MPH)</p>
      <p class="font-semibold">{{ calculateTime('car') }} hours (Car @ 65 MPH)</p>
    </div>

    <button
      @click="goToCalculator"
      class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow transition transform hover:scale-105 active:scale-95 w-full mt-4"
    >
      Continue to Calculator
    </button>
  </div>
</template>

<script>
import ReusableAddressAutocomplete from '../components/ReusableAddressAutocomplete.vue';

export default {
  components: { ReusableAddressAutocomplete },
  data() {
    return {
      origin: '',
      destination: '',
      miles: null,
    };
  },
  methods: {
    calculateTime(vehicle) {
      const speed = vehicle === 'truck' ? 50 : 65;
      return (this.miles / speed).toFixed(2);
    },
    goToCalculator() {
      if (this.miles > 0) {
        this.$router.push({ path: '/route-calculator', query: { distance: this.miles } });
      } else {
        alert('Please enter a valid mileage.');
      }
    },
  },
};
</script>
