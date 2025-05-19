<template>
  <div class="p-4 max-w-md mx-auto bg-background text-foreground min-h-screen">
    <h2 class="text-2xl font-bold mb-4 text-center">Route Calculator</h2>

    <!-- Units Toggle -->
    <div class="mb-4 flex justify-center gap-2">
      <span class="mr-2 font-semibold">Units:</span>
      <button
        @click="units = 'imperial'"
        :class="{
          'bg-primary text-white': units === 'imperial',
          'bg-surface dark:bg-surface-dark text-foreground': units !== 'imperial'
        }"
        class="px-3 py-1 rounded text-lg"
      >
        Imperial
      </button>
      <button
        @click="units = 'metric'"
        :class="{
          'bg-primary text-white': units === 'metric',
          'bg-surface dark:bg-surface-dark text-foreground': units !== 'metric'
        }"
        class="px-3 py-1 rounded text-lg"
      >
        Metric
      </button>
    </div>

    <!-- Inputs Section -->
    <div class="space-y-4">
      <!-- Distance -->
      <div>
        <label class="block mb-2 text-lg font-semibold">{{ distanceLabel() }}</label>
        <input
          v-model.number="distance"
          type="number"
          class="w-full p-2 border border-border rounded text-lg bg-surface dark:bg-surface-dark text-foreground"
          placeholder="Enter distance"
        />
      </div>

      <!-- Vehicle Type -->
      <div>
        <label class="block mb-2 text-lg font-semibold">Vehicle Type</label>
        <select
          v-model="vehicleType"
          class="w-full p-2 border border-border rounded text-lg bg-surface dark:bg-surface-dark text-foreground"
        >
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
      <div v-if="vehicleType === 'custom'">
        <label class="block mb-2 text-lg font-semibold">{{ efficiencyLabel() }}</label>
        <input
          v-model.number="customEfficiency"
          type="number"
          class="w-full p-2 border border-border rounded text-lg bg-surface dark:bg-surface-dark text-foreground"
          placeholder="Enter efficiency"
        />
      </div>

      <!-- Fuel Price -->
      <div>
        <label class="block mb-2 text-lg font-semibold">{{ fuelPriceLabel() }}</label>
        <input
          v-model.number="fuelPrice"
          type="number"
          step="0.01"
          class="w-full p-2 border border-border rounded text-lg bg-surface dark:bg-surface-dark text-foreground"
          placeholder="Enter fuel price"
        />
      </div>

      <!-- Payout & Additional Cost -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label class="block mb-2 text-lg font-semibold">Payout ($)</label>
          <input
            v-model.number="payout"
            type="number"
            step="0.01"
            class="w-full p-2 border border-border rounded text-lg bg-surface dark:bg-surface-dark text-foreground"
            placeholder="Optional payout"
          />
        </div>
        <div>
          <label class="block mb-2 text-lg font-semibold">Additional Cost ($)</label>
          <input
            v-model.number="additionalCost"
            type="number"
            step="0.01"
            class="w-full p-2 border border-border rounded text-lg bg-surface dark:bg-surface-dark text-foreground"
            placeholder="Maintenance, repairs, tolls"
          />
        </div>
      </div>
    </div>

    <!-- Calculate Button -->
    <button
      @click="calculate"
      class="mt-6 w-full bg-primary text-white px-6 py-3 rounded text-xl font-semibold
             hover:bg-primary-dark transition-colors"
    >
      Calculate
    </button>

    <!-- Promotional / Initial Message -->
    <div
      v-if="!results && !error"
      class="mt-6 p-4 bg-surface dark:bg-surface-dark border border-border rounded text-center text-foreground"
    >
      <p>Fuel discounts, 10% off Subway</p>
      <p class="mt-2 font-semibold">Start a calculation to see your savings!</p>
    </div>

    <!-- Results -->
    <div
      v-if="results"
      class="mt-6 p-4 bg-surface dark:bg-surface-dark border border-border rounded text-foreground"
    >
      <p class="text-lg">{{ fuelUsedLabel() }}: <span class="font-bold">{{ results.fuelUsed.toFixed(1) }}</span></p>
      <p class="text-lg">Fuel Cost: <span class="font-bold">${{ results.fuelCost.toFixed(2) }}</span></p>
      <p v-if="results.additionalCost > 0" class="text-lg">
        Additional Cost: <span class="font-bold">${{ results.additionalCost.toFixed(2) }}</span>
      </p>
      <p class="text-lg">Total Cost: <span class="font-bold">${{ results.totalCost.toFixed(2) }}</span></p>
      <p v-if="results.earnings !== null" class="text-lg">
        Estimated Earnings:
        <span
          :class="results.earnings < 0 ? 'text-red-600' : 'text-green-600'"
          class="font-bold"
        >
          ${{ results.earnings.toFixed(2) }}
        </span>
      </p>
      <p v-if="results.earnings < 0" class="mt-2 text-red-600 font-semibold">
        You’re running at a loss of ${{ Math.abs(results.earnings).toFixed(2) }}
      </p>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="mt-4 text-red-500 text-center">{{ error }}</div>
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

      if (!this.distance || this.distance <= 0) {
        this.error = 'Please enter a valid distance';
        return;
      }

      let efficiency;
      if (this.vehicleType === 'custom') {
        efficiency = this.customEfficiency;
      } else {
        const v = this.vehicleTypes.find(v => v.name === this.vehicleType);
        efficiency = this.units === 'imperial' ? v.efficiencyImperial : v.efficiencyMetric;
      }
      if (!efficiency || efficiency <= 0) {
        this.error = 'Please enter a valid efficiency';
        return;
      }

      if (!this.fuelPrice || this.fuelPrice <= 0) {
        this.error = 'Please enter a valid fuel price';
        return;
      }

      const fuelUsed  = this.distance / efficiency;
      const fuelCost  = fuelUsed * this.fuelPrice;
      const addCost   = this.additionalCost > 0 ? this.additionalCost : 0;
      const totalCost = fuelCost + addCost;

      let earnings = null;
      if (this.payout && this.payout > 0) {
        earnings = this.payout - totalCost;
      }

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
