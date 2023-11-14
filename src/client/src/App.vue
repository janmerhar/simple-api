<template>
  <navigation-bar @home="onHome" @gallery="onGallery"></navigation-bar>

  <responsive-layout>
    <RouterView />
  </responsive-layout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from '@/components/NavigationBar.vue'
import ResponsiveLayout from './components/layout/ResponsiveLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const onHome = () => {
  router.push({ name: 'home', params: { page: '' } })
}

const onGallery = () => {
  router.push({ name: 'gallery', params: { page: '' } })
}
</script>
