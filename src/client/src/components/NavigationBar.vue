<template>
  <nav class="navbar fixed-top nav-underline navbar-expand-lg bg-body-secondary mb-5">
    <div class="container-fluid">
      <a class="navbar-brand" href="#" @click.prevent="onHome">
        <font-awesome-icon :icon="['fas', 'cat']" size="xl" fixed-width />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarToggle"
        aria-controls="navbarToggle"
        aria-expanded="false"
      >
        <font-awesome-icon :icon="['fas', 'bars']" size="xl" fixed-width />
      </button>
      <div class="collapse navbar-collapse" id="navbarToggle">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: active == 'home' }"
              aria-current="page"
              href="#"
              @click.prevent="onHome"
              >Home</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: active == 'gallery' }"
              href="#"
              @click.prevent="onGallery"
              >Gallery</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { useRoute } from 'vue-router'

const emit = defineEmits(['home', 'gallery'])

const route = useRoute()

const active: ComputedRef<string> = computed(() => {
  return route.name ? route.name.toString() : ''
})

const onHome = () => {
  emit('home')
}

const onGallery = () => {
  emit('gallery')
}
</script>
