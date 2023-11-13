import { defineComponent, type PropType } from 'vue'
import { useGalleryPagination } from '../useGalleryPagination'
import { Breed } from '@/entities/Breed'
import { describe, vi, expect, it } from 'vitest'
import type { AxiosInstance } from 'axios'

const TestComponent = defineComponent({
  props: {
    $http: { type: Object as PropType<AxiosInstance>, required: true },
    initialPage: { type: Number, required: false }
  },
  setup(props) {
    return useGalleryPagination(props.$http, props.initialPage)
  }
})

import { mount } from '@vue/test-utils'
import { CreateBreedAttributes } from './stubs/CreateBreedAttributes.stub'

vi.mock('@/entities/Breed', () => ({
  Breed: {
    fetchAll: vi.fn(),
    numberOfBreeds: vi.fn(),
    find: vi.fn()
  }
}))

const $http = {
  get: vi.fn()
}

describe('useGalleryPagination composable', () => {
  describe('start browsing at the beginning of the gallery', async () => {
    // @ts-ignore: Mock AxiosInstance does not fit AxiosInstance type
    const wrapper = mount(TestComponent, { props: { $http, initialPage: 1 } })

    // @ts-ignore
    Breed.fetchAll.mockImplementation(vi.fn().mockResolvedValue([CreateBreedAttributes()]))

    await wrapper.vm.setupComposable()

    it('should fetch data on mount', async () => {
      expect(wrapper.vm.page).toBe(1)
      expect(wrapper.vm.currentBreed).toBeTruthy()
      expect(wrapper.vm.currentBreed).toEqual(CreateBreedAttributes())
    })

    it("should fetch the previous breed if it's available", async () => {
      expect(wrapper.vm.previousBreed).toBe(null)
    })

    it('should fetch the next breed if it is available', async () => {
      expect(wrapper.vm.nextBreed).toEqual(CreateBreedAttributes())
    })

    it("should move to the next breed if it's available", async () => {
      await wrapper.vm.goNextBreed()

      expect(wrapper.vm.page).toBe(2)
      expect(wrapper.vm.currentBreed).toEqual(CreateBreedAttributes())
      expect(wrapper.vm.previousBreed).toEqual(CreateBreedAttributes())
      expect(wrapper.vm.nextBreed).toEqual(CreateBreedAttributes())
    })
  })

  describe('start browsing at the middle of the gallery', async () => {
    // @ts-ignore: Mock AxiosInstance does not fit AxiosInstance type
    const wrapper = mount(TestComponent, { props: { $http, initialPage: 2 } })

    // @ts-ignore
    Breed.fetchAll.mockImplementation(vi.fn().mockResolvedValue([CreateBreedAttributes()]))

    await wrapper.vm.setupComposable()

    it('should start browsing at the middle of the gallery', async () => {
      expect(wrapper.vm.page).toBe(2)
      expect(wrapper.vm.currentBreed).toEqual(CreateBreedAttributes())
      expect(wrapper.vm.previousBreed).toEqual(CreateBreedAttributes())
      expect(wrapper.vm.nextBreed).toEqual(CreateBreedAttributes())
    })

    it("should move to the previous breed if it's available", async () => {
      await wrapper.vm.goPreviousBreed()

      expect(wrapper.vm.page).toBe(1)
      expect(wrapper.vm.currentBreed).toEqual(CreateBreedAttributes())
      expect(wrapper.vm.previousBreed).toEqual(null)
      expect(wrapper.vm.nextBreed).toEqual(CreateBreedAttributes())
    })
  })

  describe('start browsing at the end of the gallery', async () => {
    // @ts-ignore: Mock AxiosInstance does not fit AxiosInstance type
    const wrapper = mount(TestComponent, { props: { $http, initialPage: 100 } })

    // @ts-ignore
    Breed.fetchAll.mockImplementation(vi.fn().mockResolvedValue([CreateBreedAttributes()]))

    await wrapper.vm.setupComposable()

    it("should move to the next breed if it's available", async () => {
      wrapper.vm.nextBreed = null

      await wrapper.vm.goNextBreed()

      expect(wrapper.vm.page).toBe(100)
      expect(wrapper.vm.currentBreed).toEqual(CreateBreedAttributes())
      expect(wrapper.vm.previousBreed).toEqual(CreateBreedAttributes())
      expect(wrapper.vm.nextBreed).toEqual(null)
    })

    it("should move to the previous breed if it's available", async () => {
      await wrapper.vm.goPreviousBreed()

      expect(wrapper.vm.page).toBe(99)
      expect(wrapper.vm.currentBreed).toEqual(CreateBreedAttributes())
      expect(wrapper.vm.previousBreed).toEqual(CreateBreedAttributes())
      expect(wrapper.vm.nextBreed).toEqual(CreateBreedAttributes())
    })
  })
})
