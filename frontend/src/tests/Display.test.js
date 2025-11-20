import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Display from '../components/Display.vue'

describe('Display.vue', () => {
  it('muestra placeholder cuando no hay resultado', () => {
    const wrapper = mount(Display, {
      props: {
        resultado: null,
        error: null,
        loading: false
      }
    })
    expect(wrapper.find('.placeholder-text').exists()).toBe(true)
    expect(wrapper.text()).toContain('0')
  })

  it('muestra el resultado correctamente', () => {
    const wrapper = mount(Display, {
      props: {
        resultado: 15,
        error: null,
        loading: false
      }
    })
    expect(wrapper.find('.result-value').exists()).toBe(true)
    expect(wrapper.text()).toContain('15')
  })

  it('muestra error cuando hay un error', () => {
    const wrapper = mount(Display, {
      props: {
        resultado: null,
        error: 'No se puede dividir por cero',
        loading: false
      }
    })
    expect(wrapper.find('.error-state').exists()).toBe(true)
    expect(wrapper.text()).toContain('No se puede dividir por cero')
  })

  it('muestra spinner cuando está cargando', () => {
    const wrapper = mount(Display, {
      props: {
        resultado: null,
        error: null,
        loading: true
      }
    })
    expect(wrapper.find('.loading-state').exists()).toBe(true)
    expect(wrapper.find('.spinner').exists()).toBe(true)
  })

  it('formatea números correctamente', () => {
    const wrapper = mount(Display, {
      props: {
        resultado: 3.14159,
        error: null,
        loading: false
      }
    })
    // El número puede formatearse con coma o punto según el locale
    const text = wrapper.text()
    expect(text.includes('3.14159') || text.includes('3,14159')).toBe(true)
  })
})

