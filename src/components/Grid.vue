<template>
  <div class="grid">
    <div class="cell" v-for="i in cols + 1" :key="i">{{ i - 2 }}</div>
    <div class="grid--row" v-for="r in rows" :key="r">
      <div class="cell">{{ r - 1 }}</div>
      <cell v-for="c in cols"
            :key="c" :type="getType(c-1, r-1)"
            :x="c - 1" :y="r - 1"
            :parent="getParent(c-1, r-1)"
            :changeType="changeType"
            :setStart="setStart"
            :setGoal="setGoal">
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
      obstacles: [],
      CELL: {
        NONE: 'none',
        OBSTACLE: 'obstacle',
        START: 'start',
        GOAL: 'goal',
        PATH: 'path'
      }
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
    },
    changeType: function (x, y, type) {
      // add/remove to obstacles as necessary
      if (type === this.CELL.NONE) {
        this.obstacles.push(new Coord(x, y))
        console.log('obstacles:', this.obstacles)
        return this.CELL.OBSTACLE
      }
      else if (type === this.CELL.OBSTACLE) {
        return this.CELL.START
        // TODO: only allow 1 start/goal
      }
      else if (type === this.CELL.START) {
        return this.CELL.GOAL
      }
      else if (type === this.CELL.GOAL) {
        return this.CELL.NONE
      }
    },
    setStart: function (x, y) {
      // remove from obstacles
      return this.CELL.START
    },
    setGoal: function (x, y) {
      // remove from obstacles
      return this.CELL.GOAL
    }
  }
}
</script>

<style lang="scss" scoped>
.grid--row {
  height: 32px;
}
</style>
