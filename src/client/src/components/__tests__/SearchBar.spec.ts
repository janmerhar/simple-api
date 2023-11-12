import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import SearchBar from '@/components/SearchBar.vue'

describe('SearchBar', () => {
  const wrapper = mount(SearchBar)

  it('should render', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have a search input', () => {
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('should have a search button', () => {
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('should emit search event on button click', async () => {
    const input = wrapper.find('input')

    await input.setValue('test')
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')[0][0]).toBe('test')
  })
})
