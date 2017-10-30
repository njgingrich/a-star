<template>
<div>
  <p>Click to set an obstacle.</p>
  <p>Ctrl+Click to set start.</p>
  <p>Shift+Click to set goal.</p>
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
            :path="path"
            :parent="getParent(c-1, r-1)"
            :toggleObstacle="toggleObstacle"
            :setStart="gridSetStart"
            :setGoal="gridSetGoal">
      </cell>
    </div>
    <div :path="path"></div>
  </div>

  <v-btn @click="resetGrid" color="primary">Reset</v-btn>
</div>
</template>

<script>
import Pathfinder from '../pathfinding/pathfind'
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
    searchType: String,
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
    pathfinder: function () {
      return new Pathfinder(this.rows, this.cols, this.obstacles)
    },
    searchResults: function () {
      let results = this.pathfinder.search(this.start, this.goal, this.searchType)
      return results
    },
    path: function () {
      return this.pathfinder.reconstructPath(this.start, this.goal, this.searchResults)
    }
  },
  methods: {
    getParent (x, y) {
      let coord = new Coord(x, y)
      return this.searchResults[coord]
    },
    toggleObstacle (x, y) {
      if (this.obstacles.filter(o => o.x === x && o.y === y).length > 0) {
        this.removeObstacle(x, y)
      }
      else {
        this.addObstacle(x, y)
      }
    },
    gridSetStart (x, y) {
      this.removeObstacle(x, y)
      this.setStart(x, y)
    },
    gridSetGoal (x, y) {
      this.removeObstacle(x, y)
      this.setGoal(x, y)
    },
    resetGrid () {
      this.obstacles = []
      this.reset()
    },
    removeObstacle (x, y) {
      let i = 0
      for (i; i < this.obstacles.length; i++) {
        const o = this.obstacles[i]
        if (x === o.x && y === o.y) break
      }
      this.obstacles.splice(i, 1)
    },
    addObstacle (x, y) {
      this.obstacles.push(new Coord(x, y))
    }
  }
}
</script>

<style lang="scss" scoped>
.grid--row {
  height: 24px;
}
</style>
