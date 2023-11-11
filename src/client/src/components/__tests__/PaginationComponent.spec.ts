import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import PaginationComponent from '@/components/PaginationComponent.vue'
import { CreatePaginationComponentPropsStub } from './create-pagination-component.stub'

describe('PaginationComponent', () => {
  it('should render', async () => {
    const wrapper = mount(PaginationComponent, CreatePaginationComponentPropsStub(8, 4))
    expect(wrapper.html()).toMatchSnapshot()

    const pages = wrapper.findAll('li')

    expect(pages.length).toBe(8 + 2)

    // Active element
    expect(pages[4].classes()).toContain('active')

    // Active next and prev buttons
    expect(pages[0].classes()).not.toContain('disabled')
    expect(pages[9].classes()).not.toContain('disabled')

    // Click on prev button
    await wrapper.find('[aria-label="Previous"]').trigger('click')

    const emit = wrapper.emitted('change')

    expect(emit[0][0]).toBeTruthy()
    expect(emit[0][0]).toBe(4 - 1)

    // Click on next button
    await wrapper.find('[aria-label="Next"]').trigger('click')

    const emit2 = wrapper.emitted('change')

    expect(emit2[1][0]).toBeTruthy()
    expect(emit2[1][0]).toBe(4 + 1)

    // Click on page 1
    // access <a> sub element of pages[1]
    await pages[1].find('a').trigger('click')

    const emit3 = wrapper.emitted('change')

    expect(emit3[2][0]).toBeTruthy()
    expect(emit3[2][0]).toBe(1)
  })

  it('should render with 8 pages', () => {})

  describe('page set in the middle', () => {
    const wrapper = mount(PaginationComponent, CreatePaginationComponentPropsStub(8, 4))

    it('should render', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should have active element', () => {
      const pages = wrapper.findAll('li')
      expect(pages[4].classes()).toContain('active')
    })

    it('should have active prev button', () => {
      const prevButton = wrapper.find('[aria-label="Previous"]')

      expect(prevButton.classes()).not.toContain('disabled')
    })

    it('should have enabled next button', () => {
      const nextButton = wrapper.find('[aria-label="Next"]')

      expect(nextButton.classes()).not.toContain('disabled')
    })
  })

  describe('page set to the first page', () => {
    const wrapper = mount(PaginationComponent, CreatePaginationComponentPropsStub(8, 1))

    it('should render', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should have active element', () => {
      const pages = wrapper.findAll('li')
      expect(pages[1].classes()).toContain('active')
    })

    it('should have disabled prev button', () => {
      const prevButton = wrapper.find('[aria-label="Previous"]')
      expect(prevButton.classes()).toContain('disabled')
    })

    it('should have enabled next button', () => {
      const nextButton = wrapper.find('[aria-label="Next"]')
      expect(nextButton.classes()).not.toContain('disabled')
    })

    it("should emit 'change' event when clicking on next button", () => {
      const nextButton = wrapper.find('[aria-label="Next"]')

      nextButton.trigger('click')

      const emit = wrapper.emitted('change')

      expect(emit[0][0]).toBeTruthy()
      expect(emit[0][0]).toBe(2)
    })
  })

  describe('page set to the last page', () => {
    const wrapper = mount(PaginationComponent, CreatePaginationComponentPropsStub(8, 8))

    it('should render', () => {
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should have active element', () => {
      const pages = wrapper.findAll('li')
      expect(pages[8].classes()).toContain('active')
    })

    it('should have disabled next button', () => {
      const nextButton = wrapper.find('[aria-label="Next"]')
      expect(nextButton.classes()).toContain('disabled')
    })

    it('should have enabled prev button', () => {
      const prevButton = wrapper.find('[aria-label="Previous"]')
      expect(prevButton.classes()).not.toContain('disabled')
    })

    it("should emit 'change' event when clicking on prev button", () => {
      const prevButton = wrapper.find('[aria-label="Previous"]')

      prevButton.trigger('click')

      const emit = wrapper.emitted('change')

      expect(emit[0][0]).toBeTruthy()
      expect(emit[0][0]).toBe(7)
    })
  })
})
