import Vue from 'vue'
import Cell from '@/components/Cell'

describe('Cell.vue', () => {
  it('should be able to click through different cell types', () => {
    const Constructor = Vue.extend(Cell)
    const cell = new Constructor({
      propsData: {
        type: 'none'
      }
    }).$mount()
    expect(cell.$el.classList.contains('cell-none')).to.equal(true)
    click(cell.$el)
    cell._watcher.run()
    expect(cell.$el.classList.contains('cell-obstacle')).to.equal(true)
    click(cell.$el)
    cell._watcher.run()
    expect(cell.$el.classList.contains('cell-start')).to.equal(true)
    click(cell.$el)
    cell._watcher.run()
    expect(cell.$el.classList.contains('cell-goal')).to.equal(true)
    click(cell.$el)
    cell._watcher.run()
    expect(cell.$el.classList.contains('cell-none')).to.equal(true)
  })
})

const click = (button) => {
  const clickEvent = new window.Event('click')
  button.dispatchEvent(clickEvent)
}
