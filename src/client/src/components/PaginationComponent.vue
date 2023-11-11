<template>
  <nav aria-label="...">
    <ul class="pagination justify-content-end" v-if="pages > 0">
      <!-- Previous page button -->
      <li class="page-item">
        <a
          class="page-link"
          :class="{ disabled: !isPreviousPage }"
          href="#"
          aria-label="Previous"
          @click.prevent="onPage(currentPage - 1)"
        >
          <font-awesome-icon :icon="['fas', 'angles-left']" />
        </a>
      </li>

      <!-- Generating pages -->
      <template
        v-for="pageNumber in Array.from({ length: pages }, (_, index) => index + 1)"
        :key="pageNumber"
      >
        <li class="page-item" :class="{ active: pageNumber == currentPage }" aria-current="page">
          <a class="page-link" href="#" @click.prevent="onPage(pageNumber)">{{ pageNumber }}</a>
        </li>
      </template>

      <!-- Next page button -->
      <li class="page-item">
        <a
          class="page-link"
          :class="{ disabled: !isNextPage }"
          href="#"
          aria-label="Next"
          @click.prevent="onPage(currentPage + 1)"
        >
          <font-awesome-icon :icon="['fas', 'angles-right']" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  pages: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  }
})

const emit = defineEmits<{ change: [page: number] }>()

const isNextPage = computed(() => {
  return props.currentPage < props.pages
})

const isPreviousPage = computed(() => {
  return props.currentPage > 1
})

const onPage = (selectedPage: number) => {
  if (selectedPage > 0 && selectedPage <= props.pages) {
    emit('change', selectedPage)
  }
}
</script>
