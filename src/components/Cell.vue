<template>
  <div :class="typeClass" @click="cellChangeType()"
                          @click.ctrl="cellSetStart"
                          @click.shift="cellSetGoal">
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
    parent: Object,
    isStart: Boolean,
    isGoal: Boolean,
    changeType: Function,
    setStart: Function,
    setGoal: Function
  },
  data () {
    return {
      cellType: this.type
    }
  },
  computed: {
    typeClass: function () {
      return `cell cell-${this.cellType}`
    },
    direction: function () {
      return `${this.getDirectionFromParent()}`
    }
  },
  methods: {
    getDirectionFromParent: function () {
      const p = this.parent
      if (p === null || p === undefined) return `\u0020` // root node
      if (this.x === undefined || this.y === undefined) return `\u0020` // no path found

      if (this.x - 1 === p.x && this.y === p.y) return `←`
      else if (this.x + 1 === p.x && this.y === p.y) return `→`
      else if (this.x === p.x && this.y - 1 === p.y) return `↑`
      else if (this.x === p.x && this.y + 1 === p.y) return `↓`
      else return `?`
    },
    cellChangeType () {
      this.cellType = this.changeType(this.x, this.y, this.cellType)
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
