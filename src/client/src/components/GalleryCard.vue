<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Everything else -->
      <div class="col-4">
        <div class="row">
          <!-- Breed name +- country -->
          <h3>
            <div class="col text-center" id="flag name">
              <img
                :src="`https://flagsapi.com/${breed.country_code}/flat/48.png`"
                :alt="breed.country_code"
              />
              {{ breed.name }}
            </div>
          </h3>
          <!-- lifespan, weight -->
          <h6>
            <div class="row mb-2">
              <div class="col-12 col-md-6 pt-2">
                <font-awesome-icon :icon="['fas', 'hourglass-half']" /> {{ breed.life_span }} years
              </div>
              <div class="col-12 col-md-6 pt-2">
                <font-awesome-icon :icon="['fas', 'weight-hanging']" /> {{ breed.weight_metric }} kg
              </div>
            </div>
          </h6>

          <!-- description -->
          <p class="pt-2">{{ breed.description }}</p>

          <!-- wikipedia link -->

          <a class="link-secondary" :href="breed.wikipedia_url" target="_blank">
            <font-awesome-icon :icon="['fab', 'wikipedia-w']" />
            Read more
          </a>
        </div>
        <!-- YOU ARE AT THE BOTTOM -->
        <!-- next / previous link -->
        <div class="row mt-3">
          <div class="col-12 col-sm-6 pt-2 d-grid mx-auto">
            <button type="button" class="btn btn-primary" v-if="previousBreed" @click="onPrevious">
              <font-awesome-icon :icon="['fas', 'angle-left']" />
              {{ previousBreed?.name }}
            </button>
          </div>
          <div class="col-12 col-sm-6 pt-2 d-grid mx-auto">
            <button type="button" class="btn btn-primary" v-if="nextBreed" @click="onNext">
              {{ nextBreed?.name }} <font-awesome-icon :icon="['fas', 'angle-right']" />
            </button>
          </div>
        </div>
      </div>
      <!-- IMAGE -->
      <div class="col-8">
        <img :src="image" class="card-img-top carousel" :alt="breed.name" />
      </div>
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
  },
  nextBreed: {
    type: Object as PropType<Breed>,
    required: false
  },
  previousBreed: {
    type: Object as PropType<Breed>,
    required: false
  }
})

const emit = defineEmits(['next', 'previous'])

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

const onNext = () => {
  emit('next')
}

const onPrevious = () => {
  emit('previous')
}
</script>

<style scoped>
.carousel {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
}
</style>
