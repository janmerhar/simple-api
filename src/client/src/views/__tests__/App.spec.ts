import App from '@/App.vue'
import NavigationBar from '@/components/NavigationBar.vue'
import ResponsiveLayout from '@/components/layout/ResponsiveLayout.vue'
import { describe, vi, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'

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

describe('App', () => {
  it('renders NavigationBar component', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.findComponent(NavigationBar).exists()).toBe(true)
  })

  it('renders RouterView component', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.findComponent(ResponsiveLayout).exists()).toBe(true)
  })

  it('calls onHome method when home event is emitted', () => {
    const wrapper = shallowMount(App, {
      global: {
        stubs: ['NavigationBar', 'RouterView']
      }
    })
    wrapper.findComponent(NavigationBar).vm.$emit('home')
    expect(wrapper.vm.router.push).toHaveBeenCalledWith({ name: 'home', params: { page: '' } })
  })

  it('calls onGallery method when gallery event is emitted', () => {
    const wrapper = shallowMount(App, {
      global: {
        stubs: ['NavigationBar', 'RouterView']
      }
    })
    wrapper.findComponent(NavigationBar).vm.$emit('gallery')
    expect(wrapper.vm.router.push).toHaveBeenCalledWith({ name: 'gallery', params: { page: '' } })
  })
})
