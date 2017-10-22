import Vue from 'vue'
import Grid from '@/components/Grid'

describe('Grid.vue', () => {
  it('should render a 10x10 grid', () => {
    const Constructor = Vue.extend(Grid)
    const vm = new Constructor({
      propsData: {
        rows: 10,
        cols: 10
      }
    }).$mount()
    expect(vm.$el.querySelectorAll('.grid--row').length).to.equal(10)
  })
})
