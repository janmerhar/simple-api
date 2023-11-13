import { defineComponent, type PropType } from 'vue'
import { useSearchPagination } from '@/composables/useSearchPagination'
import { Breed } from '@/entities/Breed'
import { describe, vi, expect, it } from 'vitest'
import type { AxiosInstance } from 'axios'

const TestComponent = defineComponent({
  props: {
    $http: { type: Object as PropType<AxiosInstance>, required: true },
    initialPage: { type: Number, required: false }
  },
  setup(props) {
    return useSearchPagination(props.$http, props.initialPage)
  }
})

import { mount } from '@vue/test-utils'
import { CreateBreedReponse } from '@/entities/__tests__/create-breed-response.stub'
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

describe('useSearchPagination composable', () => {
  const numberOfBreeds = 100
  const size = 9
  const expectedNumberOfPages = Math.ceil(numberOfBreeds / size)

  describe('browsing breeds using pagination', () => {
    // @ts-ignore: Mock AxiosInstance does not fit AxiosInstance type
    const wrapper = mount(TestComponent, { props: { $http, initialPage: 1 } })

    it('should fetch data on mount', async () => {
      // @ts-ignore
      Breed.numberOfBreeds.mockImplementation(vi.fn().mockResolvedValue(numberOfBreeds))
      // @ts-ignore
      Breed.fetchAll.mockImplementation(
        vi.fn().mockResolvedValue(Array.from({ length: 9 }, () => CreateBreedAttributes()))
      )

      await wrapper.vm.setupComposable()

      expect(wrapper.vm.page).toBe(1)
      expect(wrapper.vm.numberOfPages).toBe(expectedNumberOfPages)
      expect(wrapper.vm.breeds).toEqual(Array.from({ length: 9 }, () => CreateBreedAttributes()))
      expect(wrapper.vm.isSearch).toBe(false)
    })

    it('fails to fetch a page of breeds if the page number less than 0', async () => {
      // @ts-ignore
      Breed.fetchAll.mockImplementation(vi.fn().mockResolvedValue([]))

      await wrapper.vm.fetchPageNumber(-1)

      expect(wrapper.vm.page).toBe(1)
      expect(wrapper.vm.numberOfPages).toBe(expectedNumberOfPages)
      expect(wrapper.vm.breeds).toEqual(Array.from({ length: 9 }, () => CreateBreedAttributes()))
      expect(wrapper.vm.isSearch).toBe(false)
    })

    it('fails to fetch a page of breeds if the page number is over the ammount of pages', async () => {
      // @ts-ignore
      Breed.fetchAll.mockImplementation(vi.fn().mockResolvedValue([]))

      await wrapper.vm.fetchPageNumber(1000000000)

      expect(wrapper.vm.page).toBe(1)
      expect(wrapper.vm.numberOfPages).toBe(expectedNumberOfPages)
      expect(wrapper.vm.breeds).toEqual(Array.from({ length: 9 }, () => CreateBreedAttributes()))
      expect(wrapper.vm.isSearch).toBe(false)
    })

    it('should fetch a page of breeds', async () => {
      // @ts-ignore
      Breed.fetchAll.mockImplementation(
        vi.fn().mockResolvedValue(Array.from({ length: 9 }, () => CreateBreedAttributes()))
      )

      await wrapper.vm.fetchPageNumber(2)

      expect(wrapper.vm.page).toBe(2)
      expect(wrapper.vm.numberOfPages).toBe(expectedNumberOfPages)
      expect(wrapper.vm.breeds).toEqual(Array.from({ length: 9 }, () => CreateBreedAttributes()))
      expect(wrapper.vm.isSearch).toBe(false)
    })
  })

  describe('browsing breeds using search bar', () => {
    // @ts-ignore: Mock AxiosInstance does not fit AxiosInstance type
    const wrapper = mount(TestComponent, { props: { $http, initialPage: 1 } })

    it('setup for regular browsing', async () => {
      // @ts-ignore
      Breed.numberOfBreeds.mockImplementation(vi.fn().mockResolvedValue(numberOfBreeds))
      // @ts-ignore
      Breed.fetchAll.mockImplementation(
        vi.fn().mockResolvedValue(Array.from({ length: 9 }, () => CreateBreedAttributes()))
      )

      await wrapper.vm.setupComposable()

      expect(wrapper.vm.page).toBe(1)
      expect(wrapper.vm.numberOfPages).toBe(expectedNumberOfPages)
      expect(wrapper.vm.breeds).toEqual(Array.from({ length: 9 }, () => CreateBreedAttributes()))
      expect(wrapper.vm.isSearch).toBe(false)
    })

    it('should find a breed by name', async () => {
      // @ts-ignore
      Breed.find.mockResolvedValue([CreateBreedAttributes()])

      await wrapper.vm.fetchQuery(CreateBreedAttributes().name)

      expect(wrapper.vm.isSearch).toBe(true)
      expect(wrapper.vm.page).toBe(0)
      expect(wrapper.vm.breeds.length).toBe(1)
      expect(wrapper.vm.breeds).toEqual([CreateBreedAttributes()])
    })
  })
})
