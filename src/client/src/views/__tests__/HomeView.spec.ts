import { shallowMount } from '@vue/test-utils'
import GalleryView from '@/views/GalleryView.vue'
import { Breed } from '@/entities/Breed'
import { describe, vi, expect, it } from 'vitest'

import { CreateBreedReponse } from '@/entities/__tests__/create-breed-response.stub'
import exp from 'constants'

vi.mock('@/entities/Breed', () => {
  return {
    Breed: class MockBreed {
      name = 'Labrador'
      fetchImage = () => vi.fn().mockResolvedValue('image_url')
    }
  }
})

vi.mock('vue-router', () => ({
  useRoute: vi.fn().mockReturnValue({
    params: {
      page: '1'
    }
  }),
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn()
  })
}))

describe('GalleryView', () => {
  describe('when breeds are present', () => {
    const wrapper = shallowMount(GalleryView, {
      setup() {
        return {
          breeds: {
            value: Array(9).fill(new Breed(CreateBreedReponse()))
          },
          page: {
            value: 1
          },
          numberOfPages: {
            value: 8
          },
          isSearch: {
            value: false
          }
        }
      }
    })

    it('fetches breeds on mount', () => {
      expect(wrapper.vm.page.value).toEqual(1)
      expect(wrapper.vm.breeds.value.length).toEqual(9)
      expect(wrapper.vm.numberOfPages.value).toEqual(8)
      expect(wrapper.vm.isSearch.value).toEqual(false)
    })

    it('renders the gallery card when breeds are present', () => {
      expect(wrapper.find('breed-card')).toBeDefined()
    })

    it('renders the pagination component when breeds are present', () => {
      expect(wrapper.find('pagination-component')).toBeDefined()
    })
  })

  describe('when breeds are not present', () => {
    const wrapper = shallowMount(GalleryView, {
      setup() {
        return {
          breeds: {
            value: []
          },
          page: {
            value: 1
          },
          numberOfPages: {
            value: 8
          },
          isSearch: {
            value: false
          }
        }
      }
    })

    it('does not render gallery card', () => {
      expect(wrapper.find('breed-card').exists()).toBe(false)
    })

    it('does render pagination component', () => {
      expect(wrapper.find('pagination-component')).toBeDefined()
    })
  })

  describe('when user searches for a breed', () => {
    const wrapper = shallowMount(GalleryView, {
      setup() {
        return {
          breeds: {
            value: []
          },
          page: {
            value: 1
          },
          numberOfPages: {
            value: 8
          },
          isSearch: {
            value: true
          }
        }
      }
    })

    it('does not render gallery card', () => {
      expect(wrapper.find('breed-card').exists()).toBe(false)
    })

    it('does render pagination component', () => {
      expect(wrapper.find('pagination-component').exists()).toBe(false)
    })
  })
})
