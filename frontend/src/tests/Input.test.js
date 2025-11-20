import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from '../components/Input.vue'

describe('Input.vue', () => {
  it('renderiza dos campos de input', () => {
    const wrapper = mount(Input, {
      props: {
        num1: 0,
        num2: 0
      }
    })
    const inputs = wrapper.findAll('input[type="number"]')
    expect(inputs).toHaveLength(2)
  })

  it('emite evento update:num1 cuando cambia el primer input', async () => {
    const wrapper = mount(Input, {
      props: {
        num1: 0,
        num2: 0
      }
    })
    const input1 = wrapper.find('#num1')
    await input1.setValue('10')
    expect(wrapper.emitted('update:num1')).toBeTruthy()
    expect(wrapper.emitted('update:num1')[0]).toEqual([10])
  })

  it('emite evento update:num2 cuando cambia el segundo input', async () => {
    const wrapper = mount(Input, {
      props: {
        num1: 0,
        num2: 0
      }
    })
    const input2 = wrapper.find('#num2')
    await input2.setValue('5')
    expect(wrapper.emitted('update:num2')).toBeTruthy()
    expect(wrapper.emitted('update:num2')[0]).toEqual([5])
  })

  it('deshabilita inputs cuando disabled es true', () => {
    const wrapper = mount(Input, {
      props: {
        num1: 0,
        num2: 0,
        disabled: true
      }
    })
    const inputs = wrapper.findAll('input[type="number"]')
    inputs.forEach(input => {
      expect(input.element.disabled).toBe(true)
    })
  })

  it('muestra los valores correctos en los inputs', () => {
    const wrapper = mount(Input, {
      props: {
        num1: 10,
        num2: 5
      }
    })
    expect(wrapper.find('#num1').element.value).toBe(10)
    expect(wrapper.find('#num2').element.value).toBe(5)
  })
})
