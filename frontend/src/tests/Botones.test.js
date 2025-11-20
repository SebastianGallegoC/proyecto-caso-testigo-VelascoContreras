import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Botones from '../components/Botones.vue'

describe('Botones.vue', () => {
  it('renderiza 4 botones de operaciones', () => {
    const wrapper = mount(Botones)
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(4)
  })

  it('emite evento calcular con "sumar" al hacer clic en Sumar', async () => {
    const wrapper = mount(Botones)
    const btnSumar = wrapper.find('.btn-sumar')
    await btnSumar.trigger('click')
    expect(wrapper.emitted('calcular')).toBeTruthy()
    expect(wrapper.emitted('calcular')[0]).toEqual(['sumar'])
  })

  it('emite evento calcular con "restar" al hacer clic en Restar', async () => {
    const wrapper = mount(Botones)
    const btnRestar = wrapper.find('.btn-restar')
    await btnRestar.trigger('click')
    expect(wrapper.emitted('calcular')).toBeTruthy()
    expect(wrapper.emitted('calcular')[0]).toEqual(['restar'])
  })

  it('emite evento calcular con "multiplicar" al hacer clic en Multiplicar', async () => {
    const wrapper = mount(Botones)
    const btnMultiplicar = wrapper.find('.btn-multiplicar')
    await btnMultiplicar.trigger('click')
    expect(wrapper.emitted('calcular')).toBeTruthy()
    expect(wrapper.emitted('calcular')[0]).toEqual(['multiplicar'])
  })

  it('emite evento calcular con "dividir" al hacer clic en Dividir', async () => {
    const wrapper = mount(Botones)
    const btnDividir = wrapper.find('.btn-dividir')
    await btnDividir.trigger('click')
    expect(wrapper.emitted('calcular')).toBeTruthy()
    expect(wrapper.emitted('calcular')[0]).toEqual(['dividir'])
  })

  it('deshabilita todos los botones cuando disabled es true', () => {
    const wrapper = mount(Botones, {
      props: {
        disabled: true
      }
    })
    const buttons = wrapper.findAll('button')
    buttons.forEach(button => {
      expect(button.element.disabled).toBe(true)
    })
  })

  it('botones tienen el texto correcto', () => {
    const wrapper = mount(Botones)
    expect(wrapper.text()).toContain('Sumar')
    expect(wrapper.text()).toContain('Restar')
    expect(wrapper.text()).toContain('Multiplicar')
    expect(wrapper.text()).toContain('Dividir')
  })
})
