<template>
<div>
  <div class="grid">
    <div class="cell" v-for="i in cols + 1" :key="i">{{ i - 2 }}</div>
    <div class="grid--row" v-for="r in rows" :key="r">
      <div class="cell">{{ r - 1 }}</div>
      <cell v-for="c in cols"
            :key="c"
            :x="c - 1"
            :y="r - 1"
            :start="start"
            :goal="goal"
            :obstacles="obstacles"
            :parent="getParent(c-1, r-1)"
            :toggleObstacle="toggleObstacle"
            :setStart="gridSetStart"
            :setGoal="gridSetGoal">
      </cell>
    </div>
    <div :path="path"></div>
  </div>

  <button @click="resetGrid">Reset</button>
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
    goal: Object, // Coord
    reset: Function,
    setStart: Function,
    setGoal: Function
  },
  data () {
    return {
      obstacles: []
    }
  },
  computed: {
    astar: function () {
      return new Astar(this.rows, this.cols, this.obstacles)
    },
    path: function () {
      let path = this.astar.search(this.start, this.goal)
      return path
    }
  },
  methods: {
    getParent (x, y) {
      let coord = new Coord(x, y)
      return this.path[coord]
    },
    toggleObstacle (x, y) {
      const index = this.obstacles.indexOf(new Coord(x, y))
      if (index >= 0) {
        this.obstacles.splice(index, 1)
      }
      else {
        this.obstacles.push(new Coord(x, y))
      }
    },
    gridSetStart (x, y) {
      const index = this.obstacles.indexOf(new Coord(x, y))
      if (index >= 0) {
        this.obstacles.splice(index, 1)
      }
      this.setStart(x, y)
    },
    gridSetGoal (x, y) {
      const index = this.obstacles.indexOf(new Coord(x, y))
      if (index >= 0) {
        this.obstacles.splice(index, 1)
      }
      this.setGoal(x, y)
    },
    resetGrid: function () {
      this.obstacles = []
      this.reset()
    }
  }
}
</script>

<style lang="scss" scoped>
.grid--row {
  height: 32px;
}
</style>
