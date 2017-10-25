<template>
  <div :class="typeClass" @click="changeType"
                          @click.ctrl="setStart"
                          @click.shift="setGoal">
    <span class='direction'>{{direction}}</span>
  </div>
</template>

<script>
export default {
  name: 'cell',
  props: {
    type: String,
    x: Number,
    y: Number,
    parent: Object
  },
  data () {
    return {
      CELL: {
        NONE: 'none',
        OBSTACLE: 'obstacle',
        START: 'start',
        GOAL: 'goal',
        PATH: 'path'
      },
      celltype: this.type
    }
  },
  computed: {
    typeClass: function () {
      return `cell cell-${this.celltype}`
    },
    direction: function () {
      return `${this.getDirectionFromParent()}`
    }
  },
  methods: {
    changeType: function () {
      console.log(`(${this.x}, ${this.y})`)
      if (this.celltype === this.CELL.NONE) {
        this.celltype = this.CELL.OBSTACLE
      }
      else if (this.celltype === this.CELL.OBSTACLE) {
        this.celltype = this.CELL.START
      }
      else if (this.celltype === this.CELL.START) {
        this.celltype = this.CELL.GOAL
      }
      else if (this.celltype === this.CELL.GOAL) {
        this.celltype = this.CELL.NONE
      }
    },
    setStart: function () {
      this.celltype = this.CELL.START
    },
    setGoal: function () {
      this.celltype = this.CELL.GOAL
    },
    getDirectionFromParent: function () {
      const p = this.parent
      if (p === null) return `\u0020` // root node

      if (this.x - 1 === p.x && this.y === p.y) return `←`
      else if (this.x + 1 === p.x && this.y === p.y) return `→`
      else if (this.x === p.x && this.y - 1 === p.y) return `↑`
      else if (this.x === p.x && this.y + 1 === p.y) return `↓`
      else return `?`
    }
  }
}
</script>

<style lang="scss" scoped>
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
