import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Botones from '../components/Botones.vue'

describe('Botones.vue', () => {
  it('renderiza 4 botones de operaciones', () => {
    const wrapper = mount(Botones)
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(4)
  })

  it('emite evento calcular con "sumar" al hacer clic en Add', async () => {
    const wrapper = mount(Botones)
    const buttons = wrapper.findAll('.btn-operation')
    await buttons[0].trigger('click')
    expect(wrapper.emitted('calcular')).toBeTruthy()
    expect(wrapper.emitted('calcular')[0]).toEqual(['sumar'])
  })

  it('emite evento calcular con "restar" al hacer clic en Subtract', async () => {
    const wrapper = mount(Botones)
    const buttons = wrapper.findAll('.btn-operation')
    await buttons[1].trigger('click')
    expect(wrapper.emitted('calcular')).toBeTruthy()
    expect(wrapper.emitted('calcular')[0]).toEqual(['restar'])
  })

  it('emite evento calcular con "multiplicar" al hacer clic en Multiply', async () => {
    const wrapper = mount(Botones)
    const buttons = wrapper.findAll('.btn-operation')
    await buttons[2].trigger('click')
    expect(wrapper.emitted('calcular')).toBeTruthy()
    expect(wrapper.emitted('calcular')[0]).toEqual(['multiplicar'])
  })

  it('emite evento calcular con "dividir" al hacer clic en Divide', async () => {
    const wrapper = mount(Botones)
    const buttons = wrapper.findAll('.btn-operation')
    await buttons[3].trigger('click')
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
    expect(wrapper.text()).toContain('Add')
    expect(wrapper.text()).toContain('Subtract')
    expect(wrapper.text()).toContain('Multiply')
    expect(wrapper.text()).toContain('Divide')
  })
})

