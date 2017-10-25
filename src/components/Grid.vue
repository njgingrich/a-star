<template>
  <div class="grid">
    <div class="cell" v-for="i in cols + 1" :key="i">{{ i - 2 }}</div>
    <div class="grid--row" v-for="r in rows" :key="r">
      <div class="cell">{{ r - 1 }}</div>
      <cell v-for="c in cols"
            :key="c" :type="getType(c-1, r-1)"
            :x="c - 1" :y="r - 1"
            :parent="getParent(c-1, r-1)">
      </cell>
    </div>
    <div :path="path"></div>
  </div>
</template>

<script>
import Astar from '../pathfinding/astar'
import Coord from '../pathfinding/coord'
import Cell from './Cell'

export default {
  name: 'grid',
  components: {
    Cell
  },
  props: {
    rows: Number,
    cols: Number,
    start: Object, // Coord
    goal: Object // Coord
  },
  data () {
    return {
      astar: new Astar(this.rows, this.cols)
    }
  },
  computed: {
    path: function () {
      let path = this.astar.search(this.start, this.goal)

      Object.keys(path).forEach(coord => {
        console.log(`${coord}, parent=${path[coord]}`)
      })
      return path
    }
  },
  methods: {
    getParent (x, y) {
      let coord = new Coord(x, y)
      return this.path[coord]
    },
    getType (x, y) {
      if (this.isStart(x, y)) return `start`
      if (this.isGoal(x, y)) return `goal`
      else return `none`
    },
    isStart (x, y) {
      return (x === this.start.x) && (y === this.start.y)
    },
    isGoal (x, y) {
      return (x === this.goal.x) && (y === this.goal.y)
    }
  }
}
</script>

<style lang="scss" scoped>
.grid--row {
  height: 32px;
}
</style>
