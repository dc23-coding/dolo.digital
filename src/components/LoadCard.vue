<template>
    <div class="bg-white p-4 rounded shadow mb-4">
      <h3 class="font-bold">{{ load.origin }} to {{ load.destination }}</h3>
      <p>Pay: ${{ load.pay }}</p>
      <p>Status: {{ load.status }}</p>
      <button class="bg-blue-500 text-white px-4 py-2 rounded mt-2">View Details</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      load: Object,
    },
  };
  </script>