<template>
  <v-app>
    <div id="app">
      <Navbar app :title="title"></Navbar>
      <main>
        <v-content>
          <v-container fluid>
          </v-container>
        </v-content>
        <span>Columns (X): </span><input class="btn-input" v-model.number="cols" type="number">
        <span>Rows (Y): </span><input class="btn-input" v-model.number="rows" type="number">
        <CoordInput :x="startX" :y="startY" @input="updateStart"></CoordInput>
        <br>
        <span>Goal: </span><input class="btn-input" v-model.number="goalX" type="number" size="2">,<input class="btn-input" v-model.number="goalY" type="number" size="3">
        <select v-model="searchType">
          <option v-for="type in SEARCH" :key="type">{{type}}</option>
        </select>
        <grid :rows="rows"
              :cols="cols"
              :start="setStart"
              :goal="setGoal"
              :searchType="searchType"
              :reset="reset"
              :setStart="setNewStart"
              :setGoal="setNewGoal"></grid>
      </main>
    </div>
  </v-app>
</template>

<script>
import Grid from './components/Grid'
import Coord from './pathfinding/coord'
import Navbar from './components/layout/Navbar'

export default {
  name: 'app',
  components: {
    Grid,
    Navbar
  },
  data () {
    return {
      title: 'A* Visualization',
      rows: 15,
      cols: 25,
      startX: 3,
      startY: 5,
      goalX: 5,
      goalY: 6,
      start: new Coord(3, 5),
      goal: new Coord(12, 6),
      SEARCH: {
        BFS: 'bfs',
        DIJKSTRAS: 'dijkstras',
        ASTAR: 'astar'
      },
      searchType: 'astar'
    }
  },
  computed: {
    setStart: function () {
      return new Coord(this.startX, this.startY)
    },
    setGoal: function () {
      return new Coord(this.goalX, this.goalY)
    }
  },
  methods: {
    reset: function () {
      this.setNewStart(3, 5)
      this.setNewGoal(12, 6)
    },
    setNewStart (x, y) {
      this.startX = x
      this.startY = y
    },
    setNewGoal (x, y) {
      this.goalX = x
      this.goalY = y
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
