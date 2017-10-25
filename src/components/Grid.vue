<template>
  <div class="grid">
    <div class="grid--row" v-for="r in rows" :key="r">
      <cell v-for="c in cols"
            :key="c" :type="type"
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
    cols: Number
  },
  data () {
    return {
      type: 'none',
      astar: new Astar(this.rows, this.cols)
    }
  },
  computed: {
    path: function () {
      let path = this.astar.search(new Coord(0, 0), new Coord(3, 1))

      Object.keys(path).forEach(coord => {
        console.log(`${coord}, parent=${path[coord]}`)
      })
      return path
    }
  },
  methods: {
    getParent (x, y) {
      let coord = new Coord(x, y)
      console.log(`Cell ${coord} with parent ${this.path[coord]}`)
      return this.path[coord]
    }
  }
}
</script>

<style lang="scss" scoped>
.grid--row {
  height: 32px;
}
</style>
