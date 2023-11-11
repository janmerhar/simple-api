import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import NavigationBarVue from '../NavigationBar.vue'
import { useRoute } from 'vue-router'

vi.mock('vue-router')

describe('NavigationBar', () => {
  describe('should render', () => {
    // @ts-ignore
    useRoute.mockReturnValueOnce({
      name: 'home'
    })

    it('should render', () => {
      const wrapper = mount(NavigationBarVue, {
        global: {
          stubs: {
            'font-awesome-icon': {
              template: '<i />'
            }
          }
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('should emit route change event', () => {
    // @ts-ignore
    useRoute.mockReturnValueOnce({
      name: 'home'
    })

    const wrapper = mount(NavigationBarVue, {
      global: {
        stubs: {
          'font-awesome-icon': {
            template: '<i />'
          }
        }
      }
    })

    it("should emit 'home' event when navigation bar icon is clicked", () => {
      wrapper.find('.navbar-brand').trigger('click')
      const emit = wrapper.emitted('home')

      expect(emit).toBeTruthy()
    })

    it("should emit 'home' event when home button is clicked", () => {
      wrapper.findAll('.nav-link')[0].trigger('click')
      const emit = wrapper.emitted('home')

      expect(emit).toBeTruthy()
    })

    it("should emit 'gallery' event when gallery button is clicked", () => {
      wrapper.findAll('.nav-link')[1].trigger('click')
      const emit = wrapper.emitted('gallery')

      expect(emit).toBeTruthy()
    })
  })

  describe('should highlight routes', () => {
    const wrapperHome = mount(NavigationBarVue, {
      global: {
        stubs: {
          'font-awesome-icon': {
            template: '<i />'
          }
        }
      }
    })

    // @ts-ignore
    useRoute.mockReturnValueOnce({
      name: 'home'
    })

    it("should highlight 'home' route when home page is active", () => {
      const homeLink = wrapperHome.findAll('.nav-link')[0]

      expect(homeLink.classes()).toContain('active')
    })

    const wrapperGallery = mount(NavigationBarVue, {
      global: {
        stubs: {
          'font-awesome-icon': {
            template: '<i />'
          }
        }
      }
    })

    // @ts-ignore
    useRoute.mockReturnValueOnce({
      name: 'gallery'
    })

    it("should highlight 'gallery' route when gallery page is active", () => {
      const galleryLink = wrapperGallery.findAll('.nav-link')[0]

      expect(galleryLink.classes()).toContain('active')
    })
  })
})
