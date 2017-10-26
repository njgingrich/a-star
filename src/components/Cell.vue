<template>
  <div :class="typeClass" @click="changeType()"
                          @click.ctrl="setStart()"
                          @click.shift="setGoal()">
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
    changeType: Function,
    setStart: Function,
    setGoal: Function
  },
  data () {
    return {
    }
  },
  computed: {
    typeClass: function () {
      return `cell cell-${this.type}`
    },
    direction: function () {
      return `${this.getDirectionFromParent()}`
    },
    isStart: function () {
      return (this.x === this.start.x && this.y === this.start.y)
    },
    isGoal: function () {
      return (this.x === this.goal.x && this.y === this.goal.y)
    },
    type: function () {
      if (this.isStart) return `start`
      if (this.isGoal) return `goal`
      else return `none`
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
