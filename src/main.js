// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import Astar from './pathfinding/astar'
import Coord from './pathfinding/coord'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

let astar = new Astar(20, 20)
let path = astar.findPath(new Coord(0, 0), new Coord(5, 10))
path.forEach(coord => {
  console.log(coord)
})
