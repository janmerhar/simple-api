import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import GalleryCard from '@/components/GalleryCard.vue'

import { Breed } from '@/entities/Breed'
import { CreateBreedReponse } from '@/entities/__tests__/create-breed-response.stub'
import { CreateImageReponse } from '@/entities/__tests__/create-image-response.stub'

vi.mock('@/entities/Breed', () => ({
  Breed: vi.fn().mockImplementation(() => ({
    fetchImage: vi.fn().mockImplementation(() => Promise.resolve(CreateImageReponse())),
    ...CreateBreedReponse(),
    weight_metric: CreateBreedReponse().weight.metric
  }))
}))

describe('GalleryCard', () => {
  describe('visible buttons', async () => {
    const wrapper = mount(GalleryCard, {
      props: {
        breed: new Breed(CreateBreedReponse()),
        nextBreed: new Breed(CreateBreedReponse()),
        previousBreed: new Breed(CreateBreedReponse())
      },
      global: {
        stubs: {
          'font-awesome-icon': {
            template: '<i />'
          }
        }
      }
    })

    // Await for any asynchronous tasks to complete
    await wrapper.vm.$nextTick()

    it('should render', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should render breed country code', () => {
      expect(wrapper.findAll('img')[0].attributes('src')).toContain(
        CreateBreedReponse().country_code
      )
      expect(wrapper.findAll('img')[0].attributes('alt')).toEqual(CreateBreedReponse().country_code)
    })

    it('should render breed name', () => {
      expect(wrapper.findAll('.text-center')[0].text()).toBe(CreateBreedReponse().name)
    })

    it('should render breed description', () => {
      expect(wrapper.find('p').text()).toBe(CreateBreedReponse().description)
    })

    it('should render breed lifespan', () => {
      expect(wrapper.findAll('h6>div>div')[0].text()).toContain(CreateBreedReponse().life_span)
    })

    it('should render breed weight', () => {
      expect(wrapper.findAll('h6>div>div')[1].text()).toContain(CreateBreedReponse().weight.metric)
    })

    it('should render breed wikipedia url', () => {
      expect(wrapper.findAll('a')[0].attributes('href')).toContain(
        CreateBreedReponse().wikipedia_url
      )
    })

    it('should render next breed button', () => {
      expect(wrapper.findAll('button')[0].text()).toContain(CreateBreedReponse().name)
    })

    it('should render next previous button', () => {
      expect(wrapper.findAll('button')[1].text()).toContain(CreateBreedReponse().name)
    })
  })

  describe('hidden buttons', async () => {
    const wrapper = mount(GalleryCard, {
      props: {
        breed: new Breed(CreateBreedReponse())
      },
      global: {
        stubs: {
          'font-awesome-icon': {
            template: '<i />'
          }
        }
      }
    })

    // Await for any asynchronous tasks to complete
    await wrapper.vm.$nextTick()

    it("shouldn't render previous and next button", () => {
      // check that element doesn't exist
      expect(wrapper.findAll('button')).toHaveLength(0)
    })
  })
})
