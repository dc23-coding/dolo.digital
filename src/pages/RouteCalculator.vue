<template>
  <div class="p-4 max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4 text-center">Route Calculator</h2>

    <!-- Units Toggle -->
    <div class="mb-4 flex justify-center gap-2">
      <span class="mr-2 font-semibold">Units:</span>
      <button
        @click="units = 'imperial'"
        :class="{
          'bg-blue-500 text-white': units === 'imperial',
          'bg-gray-200': units !== 'imperial'
        }"
        class="px-3 py-1 rounded text-lg"
      >
        Imperial
      </button>
      <button
        @click="units = 'metric'"
        :class="{
          'bg-blue-500 text-white': units === 'metric',
          'bg-gray-200': units !== 'metric'
        }"
        class="px-3 py-1 rounded text-lg"
      >
        Metric
      </button>
    </div>

    <!-- Distance Input -->
    <div class="mb-4">
      <label class="block mb-2 text-lg font-semibold">{{ distanceLabel() }}</label>
      <input
        v-model.number="distance"
        type="number"
        class="w-full p-2 border rounded text-lg"
        placeholder="Enter distance"
      />
    </div>

    <!-- Vehicle Type -->
    <div class="mb-4">
      <label class="block mb-2 text-lg font-semibold">Vehicle Type</label>
      <select v-model="vehicleType" class="w-full p-2 border rounded text-lg">
        <option
          v-for="type in vehicleTypes"
          :key="type.name"
          :value="type.name"
        >
          {{ type.name }} (
          {{ units === 'imperial' ? type.efficiencyImperial : type.efficiencyMetric }}
          {{ efficiencyLabel() }})
        </option>
        <option value="custom">Custom</option>
      </select>
    </div>

    <!-- Custom Efficiency -->
    <div v-if="vehicleType === 'custom'" class="mb-4">
      <label class="block mb-2 text-lg font-semibold">{{ efficiencyLabel() }}</label>
      <input
        v-model.number="customEfficiency"
        type="number"
        class="w-full p-2 border rounded text-lg"
        placeholder="Enter efficiency"
      />
    </div>

    <!-- Fuel Price -->
    <div class="mb-4">
      <label class="block mb-2 text-lg font-semibold">{{ fuelPriceLabel() }}</label>
      <input
        v-model.number="fuelPrice"
        type="number"
        step="0.01"
        class="w-full p-2 border rounded text-lg"
        placeholder="Enter fuel price"
      />
    </div>

    <!-- Payout -->
    <div class="mb-4">
      <label class="block mb-2 text-lg font-semibold">Payout ($)</label>
      <input
        v-model.number="payout"
        type="number"
        step="0.01"
        class="w-full p-2 border rounded text-lg"
        placeholder="Optional payout"
      />
    </div>

    <!-- Additional Cost -->
    <div class="mb-6">
      <label class="block mb-2 text-lg font-semibold">Additional Cost ($)</label>
      <input
        v-model.number="additionalCost"
        type="number"
        step="0.01"
        class="w-full p-2 border rounded text-lg"
        placeholder="Optional cost (maintenance, repairs, tolls, etc.)"
      />
    </div>

    <!-- Calculate Button -->
    <button
      @click="calculate"
      class="bg-blue-500 text-white px-6 py-3 rounded w-full text-xl font-semibold
             hover:bg-blue-600 transform transition-transform duration-150 ease-in-out
             hover:scale-105 active:scale-95"
    >
      Calculate
    </button>

    <!-- Results -->
    <div v-if="results" class="mt-6 p-4 bg-gray-100 rounded">
      <p class="text-lg">
        {{ fuelUsedLabel() }}:
        <span class="font-bold">{{ results.fuelUsed.toFixed(1) }}</span>
      </p>
      <p class="text-lg">
        Fuel Cost:
        <span class="font-bold">${{ results.fuelCost.toFixed(2) }}</span>
      </p>
      <p v-if="results.additionalCost > 0" class="text-lg">
        Additional Cost:
        <span class="font-bold">${{ results.additionalCost.toFixed(2) }}</span>
      </p>
      <p class="text-lg">
        Total Cost:
        <span class="font-bold">${{ results.totalCost.toFixed(2) }}</span>
      </p>
      <p v-if="results.earnings !== null" class="text-lg">
        Estimated Earnings:
        <span :class="results.earnings < 0 ? 'text-red-600' : 'text-green-600'" class="font-bold">
          ${{ results.earnings.toFixed(2) }}
        </span>
      </p>
      <p v-if="results.earnings < 0" class="mt-2 text-red-600 font-semibold">
        You’re running at a loss of ${{ Math.abs(results.earnings).toFixed(2) }}
      </p>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="mt-4 text-red-500 text-center">{{ error }}</div>

    <!-- Premium Placeholder -->
    <div v-if="results" class="mt-4 text-center text-gray-600">
      <p>Want to save this trip? Sign in for premium features!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RouteCalculator',
  data() {
    return {
      units: 'imperial',
      distance: null,
      vehicleType: 'Sedan',
      customEfficiency: null,
      fuelPrice: null,
      payout: null,
      additionalCost: null,
      results: null,
      error: null,
      vehicleTypes: [
        { name: 'Sedan', efficiencyImperial: 30, efficiencyMetric: 12.75 },
        { name: 'SUV', efficiencyImperial: 25, efficiencyMetric: 10.63 },
        { name: 'Truck', efficiencyImperial: 20, efficiencyMetric: 8.50 },
        { name: 'Semi Truck', efficiencyImperial: 10, efficiencyMetric: 4.25 }
      ]
    };
  },
  methods: {
    distanceLabel() {
      return this.units === 'imperial' ? 'Distance (miles)' : 'Distance (km)';
    },
    efficiencyLabel() {
      return this.units === 'imperial' ? 'MPG' : 'km/l';
    },
    fuelPriceLabel() {
      return this.units === 'imperial' ? 'Fuel Price ($/gallon)' : 'Fuel Price ($/liter)';
    },
    fuelUsedLabel() {
      return this.units === 'imperial' ? 'Fuel Used (gallons)' : 'Fuel Used (liters)';
    },
    calculate() {
      this.error = null;
      this.results = null;

      // Validate distance
      if (!this.distance || this.distance <= 0) {
        this.error = 'Please enter a valid distance';
        return;
      }

      // Determine efficiency
      let efficiency;
      if (this.vehicleType === 'custom') {
        efficiency = this.customEfficiency;
      } else {
        const vehicle = this.vehicleTypes.find(v => v.name === this.vehicleType);
        efficiency = this.units === 'imperial'
          ? vehicle.efficiencyImperial
          : vehicle.efficiencyMetric;
      }
      if (!efficiency || efficiency <= 0) {
        this.error = 'Please enter a valid efficiency';
        return;
      }

      // Validate fuel price
      if (!this.fuelPrice || this.fuelPrice <= 0) {
        this.error = 'Please enter a valid fuel price';
        return;
      }

      // Core calculations
      const fuelUsed  = this.distance / efficiency;
      const fuelCost  = fuelUsed * this.fuelPrice;
      const addCost   = this.additionalCost > 0 ? this.additionalCost : 0;
      const totalCost = fuelCost + addCost;

      // Earnings
      let earnings = null;
      if (this.payout && this.payout > 0) {
        earnings = this.payout - totalCost;
      }

      // Package results
      this.results = {
        fuelUsed,
        fuelCost,
        additionalCost: addCost,
        totalCost,
        earnings
      };
    }
  }
};
</script>
