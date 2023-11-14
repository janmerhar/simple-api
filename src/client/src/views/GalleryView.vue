<template>
  <template v-if="currentBreed">
    <gallery-card
      :key="page"
      :breed="currentBreed"
      :previous-breed="previousBreed"
      :next-breed="nextBreed"
      @previous="getPrevious"
      @next="getNext"
    ></gallery-card>
  </template>

  <template v-else>
    <h3 class="text-center text-secondary">No breed found</h3>
  </template>
</template>

<script setup lang="ts">
import GalleryCard from '@/components/GalleryCard.vue'

import { getCurrentInstance, nextTick, onMounted } from 'vue'
const $http = getCurrentInstance()?.appContext.config.globalProperties.$http

import { useGalleryPagination } from '@/composables/useGalleryPagination'

import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const {
  page,
  previousBreed,
  currentBreed,
  nextBreed,
  goPreviousBreed,
  goNextBreed,
  setupComposable
} = useGalleryPagination($http, route.params.page ? parseInt(route.params.page as string) : 1)

onMounted(async () => {
  await setupComposable()
  router.push({ params: { page: page.value.toString() } })
  // Forcing component to re-render
  page.value++
  await nextTick()
  page.value--
})

const getPrevious = async () => {
  await goPreviousBreed()
  router.push({ params: { page: page.value.toString() } })
}

const getNext = async () => {
  await goNextBreed()
  router.push({ params: { page: page.value.toString() } })
}
</script>
