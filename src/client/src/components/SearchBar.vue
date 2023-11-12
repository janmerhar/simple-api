<template>
  <div class="input-group mb-3">
    <input
      type="text"
      class="form-control"
      placeholder="Breed"
      aria-label="Breed"
      aria-describedby="button-addon2"
      v-model="query"
      @keyup.enter="onSearch()"
    />
    <button
      class="btn btn-outline-primary"
      type="button"
      id="button-addon2"
      @click.prevent="onSearch()"
    >
      Search
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ search: [string] }>()

const query = ref<string>('')

const onSearch = () => {
  emit('search', query.value)
}
</script>
