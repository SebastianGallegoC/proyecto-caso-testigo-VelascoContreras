import { describe, it, expect, vi, beforeEach } from 'vitest'
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
    expect(wrapper.text()).toContain('Selecciona una operación')
  })

  it('muestra el resultado correctamente', () => {
    const wrapper = mount(Display, {
      props: {
        resultado: 15,
        error: null,
        loading: false
      }
    })
    expect(wrapper.text()).toContain('15.0000')
    expect(wrapper.text()).toContain('Resultado')
  })

  it('muestra error cuando hay un error', () => {
    const wrapper = mount(Display, {
      props: {
        resultado: null,
        error: 'No se puede dividir por cero',
        loading: false
      }
    })
    expect(wrapper.text()).toContain('Error')
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
    expect(wrapper.text()).toContain('Calculando')
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
    expect(wrapper.text()).toContain('3.1416')
  })
})
