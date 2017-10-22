<template>
  <div id="app">
    <header>
      <span>A* Visualization</span>
    </header>
    <main>
      <grid :rows="10" :cols="10"></grid>
    </main>
  </div>
</template>

<script>
import Grid from './components/Grid'

export default {
  name: 'app',
  components: {
    Grid
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

main {
  text-align: center;
  margin-top: 40px;
}
</style>
