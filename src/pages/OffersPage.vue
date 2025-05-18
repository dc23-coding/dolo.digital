<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <h1 class="text-3xl font-bold mb-4 text-gray-800">{{ pageTitle }}</h1>
    <p class="text-lg text-gray-600 mb-6">{{ pageDescription }}</p>
    <button
      @click="$router.push('/')"
      class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow transition transform hover:scale-105 active:scale-95"
    >
      Back to Home
    </button>
  </div>
</template>

<script>
export default {
  name: 'OffersPage',
  data() {
    return {
      offersContent: {
        pilot: {
          title: 'Fuel Discount at Pilot',
          description: 'Save 10 cents per gallon at all Pilot locations nationwide. Exclusive for Dolo users.',
        },
        subway: {
          title: '10% Off at Subway',
          description: 'Enjoy fresh subs with 10% off your entire order at any Subway location.',
        },
        loves: {
          title: 'Service Deal at Love’s',
          description: 'Get a free tire check and discounted oil change at participating Love’s locations.',
        },
      },
    };
  },
  computed: {
    pageTitle() {
      const offer = this.offersContent[this.$route.params.vendor];
      return offer ? offer.title : 'Offer Not Found';
    },
    pageDescription() {
      const offer = this.offersContent[this.$route.params.vendor];
      return offer ? offer.description : 'This offer does not exist or is no longer available.';
    },
  },
};
</script>
