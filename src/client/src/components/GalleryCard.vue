<template>
  <div class="row">
    <!-- Everything else -->
    <div
      class="col-12 col-sm-4 order-2 order-sm-1 flexbox flexbox-direction-column flexbox-justify-content-space-between"
    >
      <div class="row mt-3">
        <!-- Breed name and country -->
        <h3>
          <div class="col text-center fw-bolder text-uppercase title-spacing" id="flag name">
            <img
              :src="`https://flagsapi.com/${breed.country_code}/flat/64.png`"
              :alt="breed.country_code"
              class="me-2"
            />
            {{ breed.name }}
          </div>
        </h3>
        <!-- Lifespan and weight -->
        <h6>
          <div class="row my-2">
            <div class="col-12 col-md-6 pt-2 fw-bolder">
              <font-awesome-icon :icon="['fas', 'hourglass-half']" /> {{ breed.life_span }} years
            </div>
            <div class="col-12 col-md-6 pt-2 fw-bolder">
              <font-awesome-icon :icon="['fas', 'weight-hanging']" /> {{ breed.weight_metric }} kg
            </div>
          </div>
        </h6>

        <!-- Description -->
        <p class="pt-2">{{ breed.description }}</p>

        <!-- Wikipedia link -->

        <a
          v-if="breed.wikipedia_url"
          class="link-secondary"
          :href="breed.wikipedia_url"
          target="_blank"
        >
          <font-awesome-icon :icon="['fab', 'wikipedia-w']" />
          Read more
        </a>
      </div>

      <!-- Previous and next link -->
      <div class="row mt-3">
        <div class="col-12 col-sm-6 pt-2 d-grid mx-auto">
          <button
            type="button"
            class="btn btn-primary p-3 button-icon"
            v-if="previousBreed"
            @click="onPrevious"
          >
            <font-awesome-icon :icon="['fas', 'angle-left']" />
            {{ previousBreed?.name }}
          </button>
        </div>
        <div class="col-12 col-sm-6 pt-2 d-grid me-auto">
          <button
            type="button"
            class="btn btn-primary p-3 button-icon"
            v-if="nextBreed"
            @click="onNext"
          >
            {{ nextBreed?.name }} <font-awesome-icon :icon="['fas', 'angle-right']" />
          </button>
        </div>
      </div>
    </div>
    <!-- IMAGE -->
    <div class="col-12 col-sm-8 order-1 order-sm-2">
      <img :src="image" class="card-img-top carousel responsive-image" :alt="breed.name" />
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
    type: Object as PropType<Breed | null>,
    required: false
  },
  previousBreed: {
    type: Object as PropType<Breed | null>,
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
  const fetchedImage = await props.breed?.fetchImage($http)

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
  object-position: 50% 30%;
}

.flexbox {
  display: flex;
}

.flexbox-direction-column {
  flex-direction: column;
}

.flexbox-justify-content-space-between {
  justify-content: space-between;
}

.title-spacing {
  letter-spacing: 1px;
}

.button-icon {
  flex-wrap: nowrap;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.responsive-image {
  width: 100%;
  height: 30vh;
}

@media (min-width: 768px) {
  .responsive-image {
    height: 80vh;
  }
}
</style>
