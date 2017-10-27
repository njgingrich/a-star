<template>
  <v-app>
    <div id="app">
      <Drawer :drawer="drawer" :toggle="toggleDrawer">
        <h4>Customize Grid</h4>
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <CoordInput name="Columns/Rows" :x="cols" :y="rows" :update="setNewDimensions"></CoordInput>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <CoordInput name="Start" :x="startX" :y="startY" :update="setNewStart"></CoordInput>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <CoordInput name="Goal" :x="goalX" :y="goalY" :update="setNewGoal"></CoordInput>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-select :items="Object.values(SEARCH)" v-model="searchType" label="Search Method" bottom>
              </v-select>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </Drawer>
      <Navbar :click="toggleDrawer" :title="title"></Navbar>
      <main>
        <v-content>
          <v-container fluid>
            <grid :rows="rows"
                  :cols="cols"
                  :start="setStart"
                  :goal="setGoal"
                  :searchType="searchType"
                  :reset="reset"
                  :setStart="setNewStart"
                  :setGoal="setNewGoal"></grid>

          </v-container>
        </v-content>
      </main>
    </div>
  </v-app>
</template>

<script>
import Grid from './components/Grid'
import Coord from './pathfinding/coord'
import Navbar from './components/layout/Navbar'
import Drawer from './components/layout/Drawer'
import CoordInput from './components/layout/CoordInput'

export default {
  name: 'app',
  components: {
    Grid,
    Navbar,
    Drawer,
    CoordInput
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
      drawer: true,
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
      this.setNewStart(this.random(0, 25), this.random(0, 15))
      this.setNewGoal(this.random(0, 25), this.random(0, 15))
      this.setNewDimensions(25, 15)
    },
    setNewStart (x, y) {
      this.startX = x
      this.startY = y
    },
    setNewGoal (x, y) {
      this.goalX = x
      this.goalY = y
    },
    setNewDimensions (cols, rows) {
      this.rows = rows
      this.cols = cols
    },
    random (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min
    },
    toggleDrawer () {
      this.drawer = !this.drawer
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
  margin-top: 40px;
}

.btn-input {
  width: 2rem;
  margin: 0.5rem 1rem;
}
</style>
