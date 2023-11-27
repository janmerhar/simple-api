<template>
  <div class="card p-0 mx-2 mb-2" style="margin-bottom: auto">
    <img :src="image" class="card-img-top carousel" :alt="breed.name" />
    <div class="card-body">
      <h5 class="card-title">
        <div class="container-fluid">
          <div class="row">
            <div class="col text-center fw-bolder text-uppercase title-spacing" id="flag name">
              <img
                class="me-2"
                :src="`https://flagsapi.com/${breed.country_code}/flat/32.png`"
                :alt="breed.country_code"
              />
              <span>
                {{ breed.name }}
              </span>
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
          <div class="row my-2">
            <div class="col fw-bolder">
              <font-awesome-icon :icon="['fas', 'hourglass-half']" /> {{ breed.life_span }} years
            </div>
            <div class="col fw-bolder">
              <font-awesome-icon :icon="['fas', 'weight-hanging']" /> {{ breed.weight_metric }} kg
            </div>
          </div>

          <p class="text-justify">{{ breed.description }}</p>
          <a
            v-if="breed.wikipedia_url?.length"
            :href="breed.wikipedia_url"
            target="_blank"
            class="btn btn-secondary button-full-width"
          >
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

const props = defineProps({
  breed: {
    type: Object as PropType<Breed>,
    required: true
  }
})

import { getCurrentInstance, onMounted, ref } from 'vue'
const $http = getCurrentInstance()?.appContext.config.globalProperties.$http

const image = ref<string>('https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp')

onMounted(async () => {
  const fetchedImage = await props.breed.fetchImage($http)

  if (fetchedImage) {
    image.value = fetchedImage
  } else {
    image.value =
      'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'
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

.align-content {
  align-content: flex-start;
}

.carousel {
  width: 20rem;
  height: 15rem;
  object-fit: cover;
  object-position: 50% 20%;
}

.text-jusify {
  text-align: justify;
}

.title-spacing {
  letter-spacing: 1px;
}

.button-full-width {
  width: 100%;
}
</style>
