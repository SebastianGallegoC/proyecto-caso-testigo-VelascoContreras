import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Teclado from '../components/Teclado.vue'

describe('Teclado.vue', () => {
  it('renderiza todos los botones necesarios', () => {
    const wrapper = mount(Teclado)
    const buttons = wrapper.findAll('button')
    // 10 números (0-9) + 4 operadores + 1 igual + 1 clear + 1 backspace + 1 decimal = 18 botones
    expect(buttons.length).toBeGreaterThanOrEqual(18)
  })

  it('emite evento number-click al hacer clic en un número', async () => {
    const wrapper = mount(Teclado)
    const numberButtons = wrapper.findAll('.btn-number')
    await numberButtons[0].trigger('click')
    expect(wrapper.emitted('number-click')).toBeTruthy()
  })

  it('emite evento operator-click con "sumar" al hacer clic en +', async () => {
    const wrapper = mount(Teclado)
    const buttons = wrapper.findAll('.btn-operator')
    const addButton = buttons.find(b => b.text() === '+')
    await addButton.trigger('click')
    expect(wrapper.emitted('operator-click')).toBeTruthy()
    expect(wrapper.emitted('operator-click')[0]).toEqual(['sumar'])
  })

  it('emite evento operator-click con "restar" al hacer clic en −', async () => {
    const wrapper = mount(Teclado)
    const buttons = wrapper.findAll('.btn-operator')
    const subtractButton = buttons.find(b => b.text() === '−')
    await subtractButton.trigger('click')
    expect(wrapper.emitted('operator-click')).toBeTruthy()
    expect(wrapper.emitted('operator-click')[0]).toEqual(['restar'])
  })

  it('emite evento operator-click con "multiplicar" al hacer clic en ×', async () => {
    const wrapper = mount(Teclado)
    const buttons = wrapper.findAll('.btn-operator')
    const multiplyButton = buttons.find(b => b.text() === '×')
    await multiplyButton.trigger('click')
    expect(wrapper.emitted('operator-click')).toBeTruthy()
    expect(wrapper.emitted('operator-click')[0]).toEqual(['multiplicar'])
  })

  it('emite evento operator-click con "dividir" al hacer clic en ÷', async () => {
    const wrapper = mount(Teclado)
    const buttons = wrapper.findAll('.btn-operator')
    const divideButton = buttons.find(b => b.text() === '÷')
    await divideButton.trigger('click')
    expect(wrapper.emitted('operator-click')).toBeTruthy()
    expect(wrapper.emitted('operator-click')[0]).toEqual(['dividir'])
  })

  it('emite evento equals-click al hacer clic en =', async () => {
    const wrapper = mount(Teclado)
    const equalsButton = wrapper.find('.btn-equals')
    await equalsButton.trigger('click')
    expect(wrapper.emitted('equals-click')).toBeTruthy()
  })

  it('emite evento clear-click al hacer clic en AC', async () => {
    const wrapper = mount(Teclado)
    const clearButton = wrapper.find('.btn-clear')
    await clearButton.trigger('click')
    expect(wrapper.emitted('clear-click')).toBeTruthy()
  })

  it('emite evento decimal-click al hacer clic en .', async () => {
    const wrapper = mount(Teclado)
    const decimalButton = wrapper.find('.btn-decimal')
    await decimalButton.trigger('click')
    expect(wrapper.emitted('decimal-click')).toBeTruthy()
  })

  it('emite evento backspace-click al hacer clic en ⌫', async () => {
    const wrapper = mount(Teclado)
    const backspaceButton = wrapper.find('.btn-backspace')
    await backspaceButton.trigger('click')
    expect(wrapper.emitted('backspace-click')).toBeTruthy()
  })

  it('deshabilita todos los botones cuando disabled es true', () => {
    const wrapper = mount(Teclado, {
      props: {
        disabled: true
      }
    })
    const buttons = wrapper.findAll('button')
    buttons.forEach(button => {
      expect(button.element.disabled).toBe(true)
    })
  })
})
