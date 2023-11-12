<template>
  <div class="card p-0 mx-2 mb-2">
    <img :src="image" class="card-img-top carousel" :alt="breed.name" />
    <div class="card-body">
      <h5 class="card-title">
        <div class="container-fluid">
          <div class="row">
            <div class="col text-center" id="flag name">
              <img
                :src="`https://flagsapi.com/${breed.country_code}/flat/24.png`"
                :alt="breed.country_code"
              />
              {{ breed.name }}
            </div>
            <div class="col-1 text-center">
              <a class="page-link" href="#" @click.prevent="toggleDescription">
                <font-awesome-icon v-if="isOpen" :icon="['fas', 'chevron-down']" />
                <font-awesome-icon v-else :icon="['fas', 'chevron-up']" />
              </a>
            </div>
            <div class="col-1"></div>
          </div>
        </div>
      </h5>
      <template v-if="isOpen">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col">
              <font-awesome-icon :icon="['fas', 'hourglass-half']" /> {{ breed.life_span }} years
            </div>
            <div class="col">
              <font-awesome-icon :icon="['fas', 'weight-hanging']" /> {{ breed.weight_metric }} kg
            </div>
          </div>

          <p class="text-justify">{{ breed.description }}</p>
          <a :href="breed.wikipedia_url" target="_blank" class="btn btn-primary">
            <font-awesome-icon :icon="['fab', 'wikipedia-w']" />
            Read more</a
          >
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Breed } from '@/entities/Breed'
import type { PropType } from 'vue'
import { nextTick } from 'vue'

const props = defineProps({
  breed: {
    type: Object as PropType<Breed>,
    required: true
  }
})

import { getCurrentInstance, onMounted, ref } from 'vue'
const $http = getCurrentInstance()?.appContext.config.globalProperties.$http

const image = ref<string>(
  'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'
)

onMounted(async () => {
  await nextTick()
  const fetchedImage = await props.breed.fetchImage($http)

  if (fetchedImage) {
    image.value = fetchedImage
  }
})

const isOpen = ref<boolean>(false)

const toggleDescription = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
.card {
  width: 20rem;
}

.carousel {
  width: 20rem;
  height: 15rem;
  object-fit: cover;
  object-position: 50% 50%;
}

.text-jusify {
  text-align: justify;
}
</style>
