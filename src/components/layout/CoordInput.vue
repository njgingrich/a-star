<template>
  <div>
    <span>{{name}}: </span>
    <input class="coord-input" v-model.number="xval" @input="update(xval, yval)" type="number" size="1">
    <span>,</span>
    <input class="coord-input" v-model.number="yval" @input="update(xval, yval)" type="number" size="1">
  </div>
</template>
<script>
export default {
  props: {
    name: String,
    x: Number,
    y: Number,
    update: Function
  },
  data () {
    return {
      xval: this.x,
      yval: this.y
    }
  }
}
</script>
<style lang="scss">
.coord-input {
  margin: 0.25rem 0.1rem;
  padding-left: 4px;
  border: 1px solid gray;
  border-radius: 1px;

  &[type=number] {
    width: 3rem;
  }
}
</style>
