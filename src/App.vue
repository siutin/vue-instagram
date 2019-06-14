<template>
  <div id="app">
    <Grid/>
  </div>
</template>

<script>
import Grid from './components/Grid.vue'

export default {
  name: 'app',
  components: {
    Grid
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
