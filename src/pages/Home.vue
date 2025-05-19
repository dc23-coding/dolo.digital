<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
    <!-- Hero Section -->
    <h1 class="text-4xl font-bold mb-4">{{ currentFeature }}</h1>
    <button
      @click="goToCalculator"
      class="bg-primary dark:bg-primary-dark text-white text-2xl font-semibold px-10 py-5 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
    >
      Start a Calculation
    </button>

    <!-- Affiliate Offers Carousel -->
    <div class="mt-8 w-full max-w-md">
      <h2 class="text-xl font-semibold mb-4">Featured Offers</h2>
      <div class="carousel-container relative overflow-hidden">
        <div
          v-for="(offer, index) in affiliateOffers"
          :key="offer.id"
          class="carousel-item transition-opacity duration-500"
          :class="{
            'opacity-0 absolute inset-0': currentOfferIndex !== index,
            'opacity-100': currentOfferIndex === index
          }"
        >
          <div class="bg-surface dark:bg-surface-dark p-4 rounded-lg shadow-md border border-border">
            <img
              :src="offer.image"
              :alt="offer.title"
              class="w-full h-32 object-cover rounded mb-2"
            />
            <h3 class="text-lg font-semibold mb-2">{{ offer.title }}</h3>
            <button
              @click="goToOffer(offer.link)"
              class="bg-primary dark:bg-primary-dark hover:bg-primary-dark text-white text-lg px-6 py-2 rounded w-full transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95"
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
      features: [
        'Plan Smarter Trips',
        'Find Fuel Discounts Fast',
        'Get Real-Time Route Insights',
      ],
      currentFeatureIndex: 0,
      affiliateOffers: [
        { id: 1, title: 'Fuel Discount at Pilot', image: '/assets/pilot.jpg', link: '/offers/pilot' },
        { id: 2, title: '10% Off at Subway', image: '/assets/subway.jpg', link: '/offers/subway' },
        { id: 3, title: 'Service Deal at Love’s', image: '/assets/loves.jpg', link: '/offers/loves' },
      ],
      currentOfferIndex: 0,
    };
  },
  computed: {
    currentFeature() {
      return this.features[this.currentFeatureIndex];
    },
  },
  mounted() {
    setInterval(() => {
      this.currentFeatureIndex = (this.currentFeatureIndex + 1) % this.features.length;
    }, 4000);
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
}
.carousel-item {
  transition: opacity 0.5s ease-in-out;
}
.opacity-0 {
  opacity: 0;
  position: absolute;
  inset: 0;
}
.opacity-100 {
  opacity: 1;
}
</style>
