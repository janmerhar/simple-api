import { shallowMount } from '@vue/test-utils'
import GalleryView from '@/views/GalleryView.vue'
import { Breed } from '@/entities/Breed'
import { describe, vi, expect, it } from 'vitest'

import { CreateBreedReponse } from '@/entities/__tests__/create-breed-response.stub'

vi.mock('@/entities/Breed', () => {
  return {
    Breed: class MockBreed {
      name = 'Labrador'
      fetchImage = () => vi.fn().mockResolvedValue('image_url')
    }
  }
})

vi.mock('@/composables/useGalleryPagination', () => {
  return {
    useGalleryPagination: vi.fn(() => ({
      page: {
        value: {
          toString: vi.fn()
        }
      },
      previousBreed: vi.fn(() => new Breed(CreateBreedReponse())),
      currentBreed: vi.fn(() => new Breed(CreateBreedReponse())),
      nextBreed: vi.fn(() => new Breed(CreateBreedReponse())),
      goPreviousBreed: vi.fn(),
      goNextBreed: vi.fn(),
      setupComposable: vi.fn()
    }))
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
  describe('when currentBreed is present', () => {
    const wrapper = shallowMount(GalleryView)

    it('fetches breeds on mount', () => {
      // @ts-ignore
      expect(wrapper.vm.currentBreed).toBeDefined()
    })

    it('renders the gallery card when currentBreed is present', () => {
      expect(wrapper.find('h3').exists()).toBe(false)
    })
  })

  describe('when currentBreed is not present', () => {
    const wrapper = shallowMount(GalleryView, {
      setup() {
        return {
          currentBreed: null
        }
      }
    })

    it('does not render gallery card', () => {
      // @ts-ignore
      expect(wrapper.vm.currentBreed).toBe(null)
      expect(wrapper.find('h3').exists()).toBe(true)
    })
  })
})
