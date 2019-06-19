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
        <div class="dialog__image" :style="{ backgroundImage: dialogImage }"></div>
        <div class="dialog__content">
          <div class="profile dialog__content__profile">
            <div class="icon icon-normal" :style="{ backgroundImage: dialogIcon}"></div>
            <div class="name">{{ genName() }}</div>
            <div class="follow"><a href="">follow</a></div>
          </div>
          <div class="dialog__content__messages">
            <div class="messages__item" v-for="j in range(1, 20)" :key="j">
              <div class="profile">
                <div class="icon icon-small" :style="{ backgroundImage: `url(${getIconImg( (dialogId + j - 1) % 9 )})` }"></div>
                <div class="name">{{ genName() }}</div>
                <div class="datetime">{{ displayDateTime() }}</div>
              </div>
              <div>
                <pre>{{ genSentence(randRange(1, 3)).join('\r\n') }}</pre>
              </div>
            </div>
          </div>
          <div class="messages__form">
            <form action="">
              <div>
                <input type="text" id="text" name="message[text]"/>
              </div>
              <div>
                <input type="submit" value="reply" />
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
import { randRange, genSentence, genName } from './generator'
import { formatDistance, subSeconds } from 'date-fns'

export default {
  name: 'app',
  components: {
    Grid, GridItem, ThumbnailItem
  },
  data () {
    return {
      isShowDialog: false,
      dialogImage: '',
      dialogIcon: '',
      dialogId: 0
    }
  },
  methods: {
    range (start, count) {
      return Array(count).fill(start).map((x, y) => x + y)
    },
    randRange (start, length) { return randRange(start, length) },
    genSentence (count) { return genSentence(count) },
    genName(count) { return genName(count) },
    getBackgroundImage (id, width) {
      return `https://picsum.photos/id/${id}/${width}`
    },
    getIconImg (id) {
      return require(`./assets/icons/${id}.jpeg`)
    },
    displayDateTime () {
      return formatDistance(subSeconds(new Date(), randRange(0, 86400*365)), new Date(), { addSuffix: true })
    },
    clickOnTumbnail (e, id) {
      console.log(`clickOnTumbnail - id: ${id}`)
      this.isShowDialog = true
      this.dialogIcon =  `url(${this.getIconImg(id % 9 )})`
      this.dialogImage = `url(${this.getBackgroundImage(id, 1024)})`
      this.dialogId = id
    },
    closeDialog(e) {
      console.log("closeDialog")
      this.isShowDialog = false
      this.dialogIcon = ''
      this.dialogImage = ''
      this.dialogId = 0
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
  .dialog__image {
    max-width: 1024px;
    max-height: 1024px;
    width: 60vh;
    height: 60vh;
  }
}

@media (orientation: portrait) {
  .dialog__image {
    max-width: 1024px;
    max-height: 1024px;
    width: 60vw;
    height: 60vw;
  }
}

.dialog__image {
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  position: relative;
  z-index: 999;
}

.dialog__content {
  width: 335px;
  text-align: left;

  position: relative;
  z-index: 999;
}

.dialog__content__profile {
  padding: 5px;
  height: 50px;

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

.dialog__content__messages {
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

.dialog__content__messages::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #F5F5F5;
}

.dialog__content__messages::-webkit-scrollbar {
  width: 5px;
  background-color: #F5F5F5;
}

.dialog__content__messages::-webkit-scrollbar-thumb {
  background-color: #aaaaaa;
}

.messages__item {
  padding: 0.15em;
}

.messages__item > :first-child {
  padding: 0.3em 0.3em 0.3em 0.3em;
}
.messages__item > :last-child {
  padding: 0 0.3em 0.3em 0.3em;
}

.messages__item:not(:last-child) {
  border-bottom: 1px solid #eeeeee;
}

.messages__item pre {
  text-align: left;
  white-space: normal;

  font-family: sans-serif;
  font-size: 8pt;
}

.messages__form {
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

.messages__form > form {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  height: 100%;
  width: 100%;
}

.messages__form > form > :first-child {
  padding: 0 0.3em 0em 0.3em;
  width: 100%;
}
.messages__form > form > :last-child {
  width: 20%;
  border-left: 1px solid #eeeeee;  
}

.messages__form > form > div > * { 
  width: 100%;
  height: 100%;
}

.messages__form > form input {
  border: 0;  
}

.messages__form > form * {
  color: #444;
  font-size: 9pt;
  background-color: white;
}

.profile {
  display: flex;
  align-items: center;
}

.profile > .name {
  padding: 0 0.6em 0 0.6em;
}

.profile > .follow {
  padding: 0 0.6em 0 0;
}

.profile > .follow > a {
  font-size: 0.8em;
  text-decoration: none;
  color: dodgerblue;
}

.icon-normal {
  width: 45px;
  height: 45px;
}

.icon-small {
  width: 30px;
  height: 30px;
}

.icon {
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
 
  border: 1px solid #fff;
  box-shadow: 0 0 0 1px #aaa;

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
    font-size: 10pt;

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