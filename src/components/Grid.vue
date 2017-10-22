<template>
  <div class="grid">
    <div class="grid--row" v-for="r in rows" :key="r">
      <cell v-for="c in cols" :key="c"></cell>
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
      rows: 10,
      cols: 10
    }
  }
}
</script>
