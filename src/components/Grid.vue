<template>
  <div class="grid">
    <div class="grid--row" v-for="r in rows" :key="r">
      <cell v-for="c in cols" :key="c" :type="type"></cell>
    </div>
  </div>
</template>

<script>
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
      type: 'none'
    }
  }
}
</script>

<style lang="scss" scoped>
.grid--row {
  height: 32px;
}
</style>
