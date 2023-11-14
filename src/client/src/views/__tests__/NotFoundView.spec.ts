import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import NotFoundViewVue from '../NotFoundView.vue'

describe('NotFoundView', () => {
  const wrapper = mount(NotFoundViewVue)

  it("should render '404 Not Found'", () => {
    expect(wrapper.find('p').text()).toBe('404')
    expect(wrapper.find('h3').text()).toBe('Page Not Found')
  })
})
