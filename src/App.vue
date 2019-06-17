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
    <div id="dialog-container" class="fade" v-show="isShowDialog">
      <div id="cover" v-on:click="closeDialog" v-show="isShowDialog"></div>
      <div id="dialog">
        <div id="dialog-image" :style="{ backgroundImage: dialogImage }"></div>
        <div id="dialog-content">
          <div id="profile">
            <div class="icon"></div>
          </div>
          <div id="message-list">
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
            <div class="message-item">Hello World text</div>
          </div>
          <div id="message-form">
            <form action="">
              <div>
                <input type="text" id="text" name="message[text]"/>
              </div>
              <div>
                <input type="submit" value="send" />
              </div>
            </form>
          </div>
        </div>
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
  opacity: 0.5;

  z-index: 998;
}

#dialog-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content:center;
  flex-direction: column;
}

#dialog {
  background-color: #eeeeee;
  margin-left: auto;
  margin-right: auto;

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
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  position: relative;
  z-index: 999;
}

#dialog-content {
  width: 335px;
  text-align: left;

  position: relative;
  z-index: 999;
}

#profile {
  padding: 5px;
  height: 50px;

  display: flex;
  flex-direction: row-reverse;

  position: relative;
  top: 0;
  left: 0;
  
  background-color: white;

  border-bottom: 1px solid #eeeeee;
  -webkit-box-shadow: 0px 2px 5px -5px rgba(0,0,0,0.45);
  -moz-box-shadow: 0px 2px 5px -5px rgba(0,0,0,0.45);
  box-shadow: 0px 2px 5px -5px rgba(0,0,0,0.45);
  z-index: 999;
}

#message-list {
  padding: 0.3em;
  overflow-y: scroll;

  position: absolute;
  width: calc(100% - 0.6em);
  height: calc(100% - 0.6em - (50px + 5px + 5px + 1px) - 30px);
  top: calc(50px + 5px + 5px + 1px);
  left: 0;
  right: 0;
  bottom: calc(30px + 0.3em);

  background-color: white;
}

#message-form {
  height: 30px;

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: white;

  -webkit-box-shadow: 0px -2px 10px -4px rgba(0,0,0,0.45);
  -moz-box-shadow: 0px -2px 10px -4px rgba(0,0,0,0.45);
  box-shadow: 0px -2px 10px -4px rgba(0,0,0,0.45);
}

#message-form > form {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  height: 100%;
  width: 100%;
}

#message-form > form > :first-child {
  padding: 0 0.3em 0em 0.3em;
  width: 100%;
}
#message-form > form > :last-child {
  width: 20%;
}

#message-form > form > div > * { 
  width: 100%;
  height: 100%;
}

#message-form > form input {
  border: 0;
}


#message-form > form * {
  color: #444;
  font-size: 9pt;
}

.message-item {
  padding: 1em 0em 1em 0;  
}

.message-item:not(:last-child) {
  border-bottom: 1px solid #eeeeee;
}

#message-list::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #F5F5F5;
}

#message-list::-webkit-scrollbar {
  width: 5px;
  background-color: #F5F5F5;
}

#message-list::-webkit-scrollbar-thumb {
  background-color: #aaaaaa;
}

.icon {
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  width: 45px;
  height: 45px;

  border: 1px solid #fff;
  box-shadow: 0 0 0 1px #aaa;

  background-image: url(https://thispersondoesnotexist.com/image);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
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

  input:focus, textarea:focus {
      outline: 0;
  }
  
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 11pt;

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