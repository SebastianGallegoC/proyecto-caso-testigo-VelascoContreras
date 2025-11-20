import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Historial from '../components/Historial.vue'

describe('Historial.vue', () => {
  it('muestra mensaje cuando el historial está vacío', () => {
    const wrapper = mount(Historial, {
      props: {
        historial: []
      }
    })
    expect(wrapper.text()).toContain('No hay operaciones aún')
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
    expect(wrapper.text()).toContain('10 + 5 = 15.0000')
    expect(wrapper.text()).toContain('20 ÷ 4 = 5.0000')
  })

  it('no muestra botón limpiar cuando el historial está vacío', () => {
    const wrapper = mount(Historial, {
      props: {
        historial: []
      }
    })
    expect(wrapper.find('.btn-limpiar').exists()).toBe(false)
  })

  it('muestra botón limpiar cuando hay items en el historial', () => {
    const historial = [
      { num1: 10, num2: 5, operacion: 'sumar', simbolo: '+', resultado: 15 }
    ]
    const wrapper = mount(Historial, {
      props: { historial }
    })
    expect(wrapper.find('.btn-limpiar').exists()).toBe(true)
  })

  it('emite evento limpiar al confirmar limpieza', async () => {
    const historial = [
      { num1: 10, num2: 5, operacion: 'sumar', simbolo: '+', resultado: 15 }
    ]
    
    // Mock de window.confirm
    global.confirm = vi.fn(() => true)
    
    const wrapper = mount(Historial, {
      props: { historial }
    })
    
    await wrapper.find('.btn-limpiar').trigger('click')
    expect(wrapper.emitted('limpiar')).toBeTruthy()
  })

  it('no emite evento limpiar si se cancela la confirmación', async () => {
    const historial = [
      { num1: 10, num2: 5, operacion: 'sumar', simbolo: '+', resultado: 15 }
    ]
    
    // Mock de window.confirm que retorna false
    global.confirm = vi.fn(() => false)
    
    const wrapper = mount(Historial, {
      props: { historial }
    })
    
    await wrapper.find('.btn-limpiar').trigger('click')
    expect(wrapper.emitted('limpiar')).toBeFalsy()
  })
})
