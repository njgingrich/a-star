<template>
  <div :class="typeClass" @click="cellClick">
    <span class='direction'>{{direction}}</span>
  </div>
</template>

<script>
export default {
  name: 'cell',
  props: {
    x: Number,
    y: Number,
    start: Object,
    goal: Object,
    parent: Object,
    obstacles: Array,
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
    type: function () {
      if (this.isStart) return `start`
      if (this.isGoal) return `goal`
      if (this.isObstacle) return `obstacle`
      else return `none`
    }
  },
  methods: {
    getDirectionFromParent () {
      const p = this.parent
      if (p === null || p === undefined) return `\u0020` // root node
      if (this.x === undefined || this.y === undefined) return `\u0020` // no path found

      if (this.x - 1 === p.x && this.y === p.y) return `←`
      else if (this.x + 1 === p.x && this.y === p.y) return `→`
      else if (this.x === p.x && this.y - 1 === p.y) return `↑`
      else if (this.x === p.x && this.y + 1 === p.y) return `↓`
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
  width: 28px;
  height: 28px;
  margin: 0 2px 2px 2px;
}

.cell-none {
  background-color: #ccc;
}

.cell-start {
  background-color: #00ff00;
}

.cell-goal {
  background-color: #a4e3ff;
}

.cell-obstacle {
  background-color: #555;
}

.cell-path {
  background-color: #aa4444;
}

.direction {
  margin-left: 8px;
  margin-right: 8px;
}
</style>
