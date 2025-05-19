<template>
  <div class="w-full h-96">
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 100%; width: 100%"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <l-marker :lat-lng="center" />
    </l-map>
  </div>
</template>

<script>

export default {
  name: "ReusableMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  props: {
    zoom: {
      type: Number,
      default: 6,
    },
    center: {
      type: Array,
      default: () => [39.8283, -98.5795], // Center of the USA
    },
  },
};
</script>
