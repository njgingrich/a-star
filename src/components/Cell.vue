<template>
  <div :class="typeClass" @click="cellClick">
    <i class="material-icons direction">{{direction}}</i>
  </div>
</template>

<script>
import Coord from '../pathfinding/coord'

export default {
  name: 'cell',
  props: {
    x: Number,
    y: Number,
    start: Object,
    goal: Object,
    parent: Object,
    obstacles: Array,
    path: Object,
    toggleObstacle: Function,
    setStart: Function,
    setGoal: Function
  },
  data () {
    return {
    }
  },
  computed: {
    typeClass () {
      return `cell cell-${this.type}`
    },
    direction () {
      return `${this.getDirectionFromParent()}`
    },
    isStart () {
      return (this.x === this.start.x && this.y === this.start.y)
    },
    isGoal () {
      return (this.x === this.goal.x && this.y === this.goal.y)
    },
    isObstacle () {
      return this.obstacles.filter(o => o.x === this.x && o.y === this.y).length > 0
    },
    isPath () {
      return this.path.hasOwnProperty(new Coord(this.x, this.y))
    },
    type: function () {
      if (this.isStart) return `start`
      if (this.isGoal) return `goal`
      if (this.isPath) return `path`
      if (this.isObstacle) return `obstacle`
      else return `none`
    }
  },
  methods: {
    getDirectionFromParent () {
      const p = this.parent
      if (p === null || p === undefined) return `\u0020` // root node
      if (this.x === undefined || this.y === undefined) return `\u0020` // no path found

      if (this.x - 1 === p.x && this.y === p.y) return `keyboard_arrow_left`
      else if (this.x + 1 === p.x && this.y === p.y) return `keyboard_arrow_right`
      else if (this.x === p.x && this.y - 1 === p.y) return `keyboard_arrow_up`
      else if (this.x === p.x && this.y + 1 === p.y) return `keyboard_arrow_down`
      else return `?`
    },
    cellClick (e) {
      if (e.ctrlKey) {
        this.cellSetStart(this.x, this.y)
      }
      else if (e.shiftKey) {
        this.cellSetGoal(this.x, this.y)
      }
      else {
        this.cellToggleObstacle(this.x, this.y)
      }
    },
    cellToggleObstacle (x, y) {
      this.toggleObstacle(x, y)
    },
    cellSetStart (x, y) {
      this.setStart(x, y)
    },
    cellSetGoal (x, y) {
      this.setGoal(x, y)
    }
  }
}
</script>

<style lang="scss">
.cell {
  display: inline-block;
  text-align: center;
  width: 22px;
  height: 22px;
  margin: 0 1px 1px 1px;
}

.cell-none {
  background-color: #ccc;
}

.cell-start {
  background-color: #00ff00;
}

.cell-goal {
  background-color: #00d1b8;
}

.cell-obstacle {
  background-color: #555;
}

.cell-path {
  background-color: #ffb5b5;
}

.direction {
  width: 24px;
  height: 24px;
  font-size: 24px;
  color: #eee;
  overflow: hidden;
}
</style>
