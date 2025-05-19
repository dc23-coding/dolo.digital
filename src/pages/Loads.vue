<template>
  <div class="p-4 max-w-md mx-auto bg-background text-foreground min-h-screen">
    <h2 class="text-2xl font-bold mb-4">Trip Planner</h2>

    <!-- Start Time -->
    <div class="mb-4">
      <label class="block mb-2 font-semibold">Start Time</label>
      <input
        v-model="startTime"
        type="time"
        class="w-full p-2 border border-border rounded bg-surface dark:bg-surface-dark text-foreground"
      />
    </div>

    <!-- Distance & Units -->
    <div class="mb-4">
      <label class="block mb-2 font-semibold">Distance ({{ units === 'imperial' ? 'miles' : 'km' }})</label>
      <div class="flex gap-2">
        <input
          v-model.number="distance"
          type="number"
          class="flex-1 p-2 border border-border rounded bg-surface dark:bg-surface-dark text-foreground"
          placeholder="Enter distance"
        />
        <select
          v-model="units"
          class="p-2 border border-border rounded bg-surface dark:bg-surface-dark text-foreground"
        >
          <option value="imperial">mi</option>
          <option value="metric">km</option>
        </select>
      </div>
    </div>

    <!-- Driving Limit Per Day -->
    <div class="mb-4">
      <label class="block mb-2 font-semibold">Driving Limit per Day (hrs)</label>
      <input
        v-model.number="driveLimit"
        type="number"
        class="w-full p-2 border border-border rounded bg-surface dark:bg-surface-dark text-foreground"
        placeholder="Default 10"
      />
    </div>

    <!-- Calculate Button -->
    <button
      @click="calculate"
      class="w-full bg-primary dark:bg-primary-dark text-white px-6 py-3 rounded-lg shadow transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95"
    >
      Calculate Trip
    </button>

    <!-- Error Message -->
    <div v-if="error" class="mt-4 text-red-500 text-center">{{ error }}</div>

    <!-- Restart Time -->
    <div v-if="needsRestart" class="mt-4 mb-4">
      <label class="block mb-2 font-semibold">Restart Time (Day {{ days + 1 }})</label>
      <input
        v-model="restartTime"
        type="time"
        class="w-full p-2 border border-border rounded bg-surface dark:bg-surface-dark text-foreground"
      />
    </div>

    <!-- Results -->
    <div
      v-if="results"
      class="mt-6 p-4 bg-surface dark:bg-surface-dark border border-border rounded text-foreground"
    >
      <p class="text-lg font-semibold">Total Hours Needed: <span class="font-bold">{{ results.totalHours.toFixed(2) }}</span></p>
      <p class="mt-2 text-lg font-semibold">Full Cycles (Drive+Work): <span class="font-bold">{{ days }}</span></p>
      <p class="text-lg font-semibold">Remaining Hours (Drive+Work): <span class="font-bold">{{ results.remainingCycleHours.toFixed(2) }}</span></p>
      <p class="mt-4 text-lg font-semibold">Est. Arrival:</p>
      <p class="font-bold">{{ results.arrivalTime }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loads',
  data() {
    return {
      units: 'imperial',
      distance: null,
      startTime: '',
      driveLimit: 10,
      workTime: 4,
      restartTime: '',
      needsRestart: false,
      days: 0,
      results: null,
      error: null,
    };
  },
  methods: {
    calculate() {
      this.error = null;
      this.results = null;
      this.needsRestart = false;
      this.days = 0;

      if (!this.startTime) {
        this.error = 'Enter start time.';
        return;
      }
      if (!this.distance || this.distance <= 0) {
        this.error = 'Enter valid distance.';
        return;
      }
      const speed = this.units === 'imperial' ? 50 : 80;
      const totalHours = this.distance / speed;

      // Calculate cycles: each cycle = driveLimit + workTime
      const cycleLen = this.driveLimit + this.workTime;
      const fullCycles = Math.floor(totalHours / cycleLen);
      const remainingCycleHours = totalHours - fullCycles * cycleLen;
      this.days = fullCycles;

      // Determine if restart needed (only if remainingCycleHours > cycleLen or fullCycles>=1)
      if (fullCycles >= 1) {
        this.needsRestart = true;
        if (!this.restartTime) {
          return; // wait for restart input
        }
      }

      // Helper to parse and format time
      const parse = t => { const [h,m]=t.split(':').map(Number); return h + m/60; };
      const format = dec => { const h=Math.floor(dec)%24; const m=Math.round((dec%1)*60); return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`; };

      // Compute arrival time
      let arrivalDec;
      if (fullCycles === 0) {
        arrivalDec = parse(this.startTime) + totalHours;
      } else {
        // After break, restart at restartTime
        arrivalDec = parse(this.restartTime) + remainingCycleHours;
      }
      const dayLabel = fullCycles === 0 ? '' : `Day ${fullCycles + 1} `;
      const arrivalTime = dayLabel + 'at ' + format(arrivalDec);

      this.results = { totalHours, remainingCycleHours, arrivalTime };
    },
  },
};
</script>

<style scoped>
/* Tailwind utility classes used */
</style>