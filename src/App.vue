<template>
  <div id="app">
    <header>
      <h1>A* Visualization</h1>
    </header>
    <main>
      <span>Columns (X): </span><input class="btn-input" v-model.number="cols" type="number">
      <span>Rows (Y): </span><input class="btn-input" v-model.number="rows" type="number">
      <br>
      <span>Start: </span><input class="btn-input" v-model.number="startX" type="number" size="2">,<input class="btn-input" v-model.number="startY" type="number" size="3">
      <br>
      <span>Goal: </span><input class="btn-input" v-model.number="goalX" type="number" size="2">,<input class="btn-input" v-model.number="goalY" type="number" size="3">
      <grid :rows="rows" :cols="cols" :start="setStart" :goal="setGoal"></grid>
    </main>
  </div>
</template>

<script>
import Grid from './components/Grid'
import Coord from './pathfinding/coord'

export default {
  name: 'app',
  components: {
    Grid
  },
  data () {
    return {
      rows: 15,
      cols: 25,
      startX: 3,
      startY: 5,
      goalX: 12,
      goalY: 7,
      start: new Coord(3, 5),
      goal: new Coord(12, 6)
    }
  },
  computed: {
    setStart: function () {
      return new Coord(this.startX, this.startY)
    },
    setGoal: function () {
      return new Coord(this.goalX, this.goalY)
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

header {
  text-align: center;
}

main {
  text-align: center;
  margin-top: 40px;
}

.btn-input {
  width: 2rem;
  margin: 0.5rem 1rem;
}
</style>
