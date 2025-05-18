<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Welcome to Dolo.Digital</h1>

    <!-- Primary CTA Button with Animation -->
    <button
      class="bg-blue-500 hover:bg-blue-600 text-white text-2xl font-semibold px-10 py-5 rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
      @click="goToCalculator"
    >
      Start a Calculation
    </button>

    <div class="mt-8 w-full max-w-md">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Featured Offers</h2>
      <div class="carousel-container">
        <div
          v-for="(offer, index) in affiliateOffers"
          :key="offer.id"
          class="carousel-item"
          :class="{ 'hidden': currentOfferIndex !== index }"
        >
          <div class="bg-white p-4 rounded-lg shadow-md">
            <img :src="offer.image" :alt="offer.title" class="w-full h-32 object-cover rounded mb-2" />
            <h3 class="text-lg font-semibold text-gray-800">{{ offer.title }}</h3>
            <button
              class="bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-2 rounded mt-2 w-full transition transform hover:scale-105 active:scale-95"
              @click="goToOffer(offer.link)"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      affiliateOffers: [
        { id: 1, title: 'Fuel Discount at Pilot', image: '/assets/pilot.jpg', link: '/offers/pilot' },
        { id: 2, title: '10% Off at Subway', image: '/assets/subway.jpg', link: '/offers/subway' },
        { id: 3, title: 'Service Deal at Love’s', image: '/assets/loves.jpg', link: '/offers/loves' },
      ],
      currentOfferIndex: 0,
    };
  },
  mounted() {
    setInterval(() => {
      this.currentOfferIndex = (this.currentOfferIndex + 1) % this.affiliateOffers.length;
    }, 5000);
  },
  methods: {
    goToCalculator() {
      this.$router.push('/route-calculator');
    },
    goToOffer(link) {
      this.$router.push(link);
    },
  },
};
</script>

<style scoped>
.carousel-container {
  position: relative;
  overflow: hidden;
}

.carousel-item {
  transition: opacity 0.5s ease-in-out;
}

.hidden {
  opacity: 0;
  position: absolute;
  top: 0;
}
</style>
