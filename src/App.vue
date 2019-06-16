<template>
  <div id="app">
    <div id="container">
      <Grid>
         <template v-for="i in range(1, 90)">
          <grid-item :id="i" :key="i" v-slot="{ id, width, isReady }">
            <thumbnail-item v-if="isReady" :id="id" :width="width" v-on:click.native="clickOnTumbnail($event, id)"></thumbnail-item>
          </grid-item>
        </template>
      </Grid>
    </div>
    <div id="cover" v-on:click="closeDialog" v-show="isShowDialog"></div>
    <div id="dialog-container" class="fade" v-on:click="closeDialog" v-show="isShowDialog">
      <div id="dialog" v-on:click="closeDialog">
        <div id="dialog-image" :style="{ backgroundImage: dialogImage }"></div>
        <div id="dialog-content"></div>
      </div>
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
  data () {
    return {
      isShowDialog: false,
      dialogImage: ''
    }
  },
  methods: {
    range (start, count) {
      return Array(count).fill(start).map((x, y) => x + y)
    },
    getBackgroundImage (id, width) {
      return `https://picsum.photos/id/${id}/${width}`
    },
    clickOnTumbnail (e, id) {
      console.log(`clickOnTumbnail - id: ${id}`)
      window.myEvent = e
      console.log(e)
      this.isShowDialog = true
      this.dialogImage = `url(${this.getBackgroundImage(id, 1024)})`
    },
    closeDialog(e) {
      console.log("closeDialog")
      this.isShowDialog = false
    }
  }
}
</script>

<style scoped>
#cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  background-color: black;
  opacity: 0.2;  
}

#dialog-container {
 position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  display: flex;
  justify-content: center;
  flex-direction: column;
}

#dialog {
  background-color: #eeeeee;
  margin-left: auto;
  margin-right: auto;
  padding: 0.2em;

  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
}

@media (orientation: landscape) {
  #dialog-image {
    max-width: 1024px;
    max-height: 1024px;
    width: 60vh;
    height: 60vh;
  }
}

@media (orientation: portrait) {
  #dialog-image {
    max-width: 1024px;
    max-height: 1024px;
    width: 60vw;
    height: 60vw;
  }
}

#dialog-image {
  margin: 2.5px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

#dialog-content {
  margin: 2.5px;
  width: 335px;
  text-align: left;
}
}

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

.fade {
  opacity: 0;
  animation-name: fadein;
  animation-duration: .2s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-direction: normal;
  animation-timing-function: ease-out; 
}

@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
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

    /* retain dialog position */
    height: 100vh;
    overflow-y: scroll;
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