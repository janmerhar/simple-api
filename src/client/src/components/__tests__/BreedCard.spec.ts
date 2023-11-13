import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import BreedCard from '@/components/BreedCard.vue'
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

describe('BreedCard', async () => {
  const wrapper = mount(BreedCard, {
    props: {
      breed: new Breed(CreateBreedReponse())
    }
  })

  // Await for any asynchronous tasks to complete
  await wrapper.vm.$nextTick()

  describe('should render small card', () => {
    it('should render', async () => {
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should render breed country code', async () => {
      expect(wrapper.props().breed.country_code).toBe('US')
      expect(wrapper.findAll('img')[1].attributes('src')).toContain(
        CreateBreedReponse().country_code
      )
      expect(wrapper.findAll('img')[1].attributes('alt')).toEqual(CreateBreedReponse().country_code)
    })

    it('should render breed name', async () => {
      expect(wrapper.findAll('.text-center')[0].text()).toBe(CreateBreedReponse().name)
    })

    it("should render button to expand breed's description", () => {
      expect(wrapper.findAll('font-awesome-icon')[0].attributes('icon')).toContain('chevron-up')
    })
  })

  describe("should expand breed's description", () => {
    it('should render breed description', async () => {
      await wrapper.findAll('a.page-link')[0].trigger('click')

      // check if icon has a different icon
      expect(wrapper.findAll('font-awesome-icon')[0].attributes('icon')).toContain('chevron-down')
    })

    it("should render breed's lifespan and weight", () => {
      const life_span = wrapper.findAll('.row.my-2>.col')[0]
      expect(life_span.text()).toContain(CreateBreedReponse().life_span)

      const weight = wrapper.findAll('.row.my-2>.col')[1]
      expect(weight.text()).toContain(CreateBreedReponse().weight.metric)
    })

    it("should render breed's desciption", () => {
      expect(wrapper.findAll('.text-justify')[0].text()).toContain(CreateBreedReponse().description)
    })

    it("should render breed's wikipedia url", () => {
      expect(wrapper.findAll('a')[1].attributes('href')).toBe(CreateBreedReponse().wikipedia_url)
    })

    it("should close breed's description", async () => {
      await wrapper.findAll('a.page-link')[0].trigger('click')
      expect(wrapper.findAll('font-awesome-icon')[0].attributes('icon')).toContain('chevron-up')
    })
  })
})
