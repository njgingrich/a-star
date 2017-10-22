<template>
  <div :class="typeClass">
  </div>
</template>

<script>
export default {
  name: 'cell',
  props: {
    type: String
  },
  computed: {
    typeClass: function () {
      return `cell cell-${this.type}`
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
