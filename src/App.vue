<template>
  <div id="app">
    <header>
      <h1>A* Visualization</h1>
    </header>
    <main>
      <span>Columns (X): </span><input class="btn-input" v-model.number="cols" type="number">
      <span>Rows (Y): </span><input class="btn-input" v-model.number="rows" type="number">
      <grid :rows="rows" :cols="cols"></grid>
    </main>
  </div>
</template>

<script>
import Grid from './components/Grid'

export default {
  name: 'app',
  components: {
    Grid
  },
  data () {
    return {
      rows: 15,
      cols: 25
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
  display: inline;
  margin: 1rem 2rem;
}
</style>
