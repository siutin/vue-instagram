<template>
  <vue100vh :css="{height: '100rvh'}">
    <div id="app">
      <div id="container" v-if="!isMobile || (isMobile && !isShowDialog)">
        <header>
          <h1>Explorer</h1>
        </header>
        <Grid>
          <template v-for="i in range(1, 90)">
            <grid-item :id="i" :key="i" v-slot="{ id, width, isReady }">
              <thumbnail-item
              v-if="isReady" 
              :id="id"
              :width="width" 
              @click.native="clickOnTumbnail($event, id)"
              @hover="hoverOnTumbnail"
              >
                <div class="thumbnail-item--hover fade" :id="id" v-if="currentHoverId === id">
                  <div class="cover"></div>
                  <div class="like-reply-section">
                    <div> 
                      <div><img :src="require('@/assets/favorite-heart-button.png')" alt="" /></div>
                      <div>{{ randRange(0, 999) }}</div>
                    </div>
                    <div> 
                      <div><img :src="require('@/assets/comment-black-oval-bubble-shape.png')" alt="" /></div>
                      <div>{{ randRange(0, 999) }}</div>
                    </div>
                  </div>
                </div>
              </thumbnail-item>
            </grid-item>
          </template>
        </Grid>
      </div>
      <div id="dialog-container" class="fade" v-if="isShowDialog">
        <div id="cover" @click="closeDialog" v-if="!isMobile"></div>
        <post-dialog :id="dialogId"></post-dialog>
      </div>
    </div>
  </vue100vh>  
</template>

<script>
import vue100vh from 'vue-100vh'
import Grid from './components/Grid.vue'
import GridItem from './components/GridItem'
import ThumbnailItem from './components/ThumbnailItem'
import PostDialog from './components/PostDialog'
import { randRange } from './generator'

export default {
  name: 'app',
  components: {
    vue100vh, Grid, GridItem, ThumbnailItem, PostDialog
  },
  data () {
    return {
      currentHoverId: -1,
      isShowDialog: false,
      dialogId: -1,
      windowWidth: window.innerWidth
    }
  },
  computed: { 
    isMobile () {
      return this.windowWidth <= 480
    }
  },
  methods: {
    range (start, count) {
      return Array(count).fill(start).map((x, y) => x + y)
    },
    randRange (start, length) { return randRange(start, length) },
    getBackgroundImage (id, width) {
      return `https://picsum.photos/id/${id}/${width}`
    },
    getIconImg (id) {
      return require(`./assets/icons/${id}.jpeg`)
    },
    clickOnTumbnail (e, id) {
      console.log(`clickOnTumbnail - id: ${id}`)
      this.isShowDialog = true
      this.dialogId = id
    },
    closeDialog(e) {
      console.log("closeDialog")
      this.isShowDialog = false
      this.dialogId = -1
    },
    hoverOnTumbnail ({ id, isHover }) {
      console.log(`hoverOnTumbnail: ${id} ${isHover}`)
      this.currentHoverId = isHover ? id : -1
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
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

.thumbnail-item--hover {
   height: 100%;
   width: 100%;
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
}

.thumbnail-item--hover--active {
  display: block;
}
.thumbnail-item--hover .cover {
   height: 100%;
   width: 100%;
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
  
  background-color: black;
   opacity: 0.5;
}

.thumbnail-item--hover .like-reply-section {
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;

   color: white;
   font-size: 0.6em;

   display: flex;
   flex-direction: row;
   justify-content: space-evenly;
   align-items: flex-end;
   padding: 15pt;
}

.thumbnail-item--hover .like-reply-section img {
  height: 1em;
  filter: invert(100%);
  padding-right: 0.3em;
  margin-top: 1px;
}

.thumbnail-item--hover .like-reply-section > div {
  display: flex;
  flex-direction: row;
  justify-items: baseline;
  align-items: center;
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

<style>
  @import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

  * {
    margin: 0;
    padding: 0;
  }

  input:focus, textarea:focus {
      outline: 0;
  }
  
  #app {
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 10pt;

    /* retain dialog position */
    height: 100%;
    overflow-y: scroll;
  }

  #container {
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1em;
  }

   header {
     padding: 0 10px 0 10px;
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