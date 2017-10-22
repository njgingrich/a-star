<template>
  <div :class="typeClass" @click="changeType">
  </div>
</template>

<script>
export default {
  name: 'cell',
  props: {
    type: String
  },
  data () {
    return {
      CELL: {
        NONE: 'none',
        OBSTACLE: 'obstacle',
        START: 'start',
        GOAL: 'goal'
      },
      celltype: this.type
    }
  },
  computed: {
    typeClass: function () {
      return `cell cell-${this.celltype}`
    }
  },
  methods: {
    changeType: function () {
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
</style>
