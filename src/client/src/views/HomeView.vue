<template>
  <search-bar class="pb-4" @search="(searchQuery) => getQuery(searchQuery)"></search-bar>

  <div
    class="row row-cols-sm-2 row-cols-lg-3 row-cols-xs-1 justify-content-center pb-3 align-items"
  >
    <template v-if="breeds?.length > 0">
      <template v-for="breed in breeds" :key="breed.name">
        <breed-card :breed="breed"></breed-card>
      </template>
    </template>
    <template v-else>
      <h3 class="text-center text-secondary">No breeds found</h3>
    </template>
  </div>

  <pagination-component
    v-if="!isSearch"
    :pages="numberOfPages"
    :current-page="page"
    @change="(selectedPage) => getPage(selectedPage)"
  ></pagination-component>
</template>

<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import BreedCard from '@/components/BreedCard.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

import { getCurrentInstance } from 'vue'
const $http = getCurrentInstance()?.appContext.config.globalProperties.$http

import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

import { useSearchPagination } from '@/composables/useSearchPagination'

const { breeds, page, numberOfPages, isSearch, fetchQuery, fetchPageNumber, setupComposable } =
  useSearchPagination($http, route.params.page ? parseInt(route.params.page as string) : 1)

setupComposable()

const getPage = async (page: number) => {
  await fetchPageNumber(page)
  // Set page parameter in url
  router.push({ params: { page: page.toString() } })
}

const getQuery = async (query: string) => {
  await fetchQuery(query)
  // Remove page parameter from url
  router.push({ params: { page: '' } })
}
</script>
<style scoped>
.align-items {
  align-items: flex-start;
}
</style>
