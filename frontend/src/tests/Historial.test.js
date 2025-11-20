import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Historial from '../components/Historial.vue'

describe('Historial.vue', () => {
  it('muestra mensaje cuando el historial está vacío', () => {
    const wrapper = mount(Historial, {
      props: {
        historial: []
      }
    })
    expect(wrapper.text()).toContain('No calculations yet')
  })

  it('renderiza items del historial correctamente', () => {
    const historial = [
      { num1: 10, num2: 5, operacion: 'sumar', simbolo: '+', resultado: 15 },
      { num1: 20, num2: 4, operacion: 'dividir', simbolo: '÷', resultado: 5 }
    ]
    const wrapper = mount(Historial, {
      props: { historial }
    })
    expect(wrapper.findAll('.historial-item')).toHaveLength(2)
    expect(wrapper.text()).toContain('10 + 5')
    expect(wrapper.text()).toContain('= 15')
    expect(wrapper.text()).toContain('20 ÷ 4')
    expect(wrapper.text()).toContain('= 5')
  })

  it('no muestra botón limpiar cuando el historial está vacío', () => {
    const wrapper = mount(Historial, {
      props: {
        historial: []
      }
    })
    expect(wrapper.find('.btn-clear').exists()).toBe(false)
  })

  it('muestra botón limpiar cuando hay items en el historial', () => {
    const historial = [
      { num1: 10, num2: 5, operacion: 'sumar', simbolo: '+', resultado: 15 }
    ]
    const wrapper = mount(Historial, {
      props: { historial }
    })
    expect(wrapper.find('.btn-clear').exists()).toBe(true)
  })

  it('emite evento limpiar al hacer clic en botón clear', async () => {
    const historial = [
      { num1: 10, num2: 5, operacion: 'sumar', simbolo: '+', resultado: 15 }
    ]
    
    const wrapper = mount(Historial, {
      props: { historial }
    })
    
    await wrapper.find('.btn-clear').trigger('click')
    expect(wrapper.emitted('limpiar')).toBeTruthy()
  })
})

