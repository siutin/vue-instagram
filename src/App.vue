<template>
  <div id="app">
    <div id="container">
      <Grid>
         <template v-for="i in range(1, 90)">
          <grid-item :id="i" :key="i" v-slot="{ id, width, isReady }">
            <thumbnail-item v-if="isReady" :id="i" :width="width"></thumbnail-item>
          </grid-item>
        </template>
      </Grid>
    </div>
  </div>
</template>

<script>
import Grid from './components/Grid.vue'
import GridItem from './components/GridItem'
import ThumbnailItem from './components/ThumbnailItem'
export default {
  name: 'app',
  components: {
    Grid, GridItem, ThumbnailItem
  },
  methods: {
    range (start, count) {
      return Array(count).fill(start).map((x, y) => x + y)
    }
  }
}
</script>

<style scoped>
.grid > div.item {
  text-align: center;
  font-size: 30px;
  position: relative;
  margin: 10px;
  border: 1px solid #aaaaaa;
  box-sizing: border-box;
}

.grid > div.item:before {
  content: "";
  float: left;
  padding-top: 100%;
}
</style>

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

  #container {
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
  }

  /*
  ##Device = Tablets, Ipads (portrait)
  ##Screen = B/w 768px
*/
@media (min-width: 768px) {

  .grid > div.item {
    flex-basis: calc(33.333% - 20px);
  }

  .grid > div.item:nth-child(odd) {
      background-color: #eeeeee;
  }

  .grid > div.item:nth-child(even) {
      background-color: #eeeeee;
  }
}

/*
  ##Device = Low Resolution Tablets, Mobiles (Landscape)
  ##Screen = B/w 481px to 767px
*/
@media (min-width: 481px) and (max-width: 767px) {
  .grid > div.item {
    flex-basis: calc(50% - 20px);
  }

  .grid > div.item:nth-child(2n+1) {
      background-color: #eeeeee;
  }

  .grid > div.item:nth-child(2n+2) {
      background-color: #eeeeee;
  }
}

/*
  ##Device = Most of the Smartphones Mobiles (Portrait)
  ##Screen = B/w 320px to 479px
*/
@media (max-width: 480px) {
  .grid > div.item {
    flex-basis: calc(100% - 20px);
  }

  .grid > div.item:nth-child(odd) {
      background-color: #eeeeee;
  }

  .grid > div.item:nth-child(even) {
      background-color: #eeeeee;
  }
}

</style>