import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Display from '../components/Display.vue'

describe('Display.vue', () => {
  it('muestra valor por defecto cuando no hay entrada', () => {
    const wrapper = mount(Display, {
      props: {
        displayValue: '0',
        operation: null,
        previousValue: null,
        error: null,
        loading: false
      }
    })
    expect(wrapper.find('.display-value').exists()).toBe(true)
    expect(wrapper.text()).toContain('0')
  })

  it('muestra el valor ingresado correctamente', () => {
    const wrapper = mount(Display, {
      props: {
        displayValue: '15',
        operation: null,
        previousValue: null,
        error: null,
        loading: false
      }
    })
    expect(wrapper.find('.display-value').exists()).toBe(true)
    expect(wrapper.text()).toContain('15')
  })

  it('muestra la operación en curso', () => {
    const wrapper = mount(Display, {
      props: {
        displayValue: '5',
        operation: 'sumar',
        previousValue: 10,
        error: null,
        loading: false
      }
    })
    expect(wrapper.find('.display-operation').exists()).toBe(true)
    expect(wrapper.text()).toContain('10')
    expect(wrapper.text()).toContain('+')
  })

  it('muestra error cuando hay un error', () => {
    const wrapper = mount(Display, {
      props: {
        displayValue: '0',
        operation: null,
        previousValue: null,
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
        displayValue: '0',
        operation: null,
        previousValue: null,
        error: null,
        loading: true
      }
    })
    expect(wrapper.find('.loading-state').exists()).toBe(true)
    expect(wrapper.find('.spinner').exists()).toBe(true)
  })
})

