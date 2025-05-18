<template>
  <div class="relative">
    <input
      v-model="query"
      @input="fetchSuggestions"
      type="text"
      :placeholder="placeholder"
      class="w-full p-2 border rounded"
    />
    <ul v-if="suggestions.length" class="absolute bg-white border rounded shadow mt-1 max-h-40 overflow-y-auto z-10">
      <li
        v-for="suggestion in suggestions"
        :key="suggestion.place_id"
        @click="selectSuggestion(suggestion)"
        class="px-2 py-1 cursor-pointer hover:bg-gray-100"
      >
        {{ suggestion.display_name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: 'Enter address',
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      query: this.modelValue || '',
      suggestions: [],
    };
  },
  methods: {
    fetchSuggestions() {
      if (this.query.length > 2) {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.query)}`)
          .then(res => res.json())
          .then(data => {
            this.suggestions = data;
          });
      } else {
        this.suggestions = [];
      }
    },
    selectSuggestion(suggestion) {
      this.query = suggestion.display_name;
      this.suggestions = [];
      this.$emit('update:modelValue', this.query);
    },
  },
  watch: {
    modelValue(newVal) {
      this.query = newVal;
    },
  },
};
</script>
