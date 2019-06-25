<template>
  <div>
    <header>
      <div class="title">Explore</div>
      <div class="subtitle">IG clone with VueJS. Made by <a href="http://martinchan.me" target="_blank">Martin Chan</a></div>
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
</template>

<script>
import Grid from './../components/Grid.vue'
import GridItem from './../components/GridItem'
import ThumbnailItem from './../components/ThumbnailItem'
import { randRange } from './../generator'

export default {
  name: 'Explore',
    components: {
     Grid, GridItem, ThumbnailItem
  },
  data () {
    return {
      currentHoverId: -1
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
      return require(`./../assets/icons/${id}.jpeg`)
    },
    clickOnTumbnail (e, id) {
      console.log(`clickOnTumbnail - id: ${id}`)
      this.$router.push({ name: 'post',  params: { id: String(id) } })
    },
    hoverOnTumbnail ({ id, isHover }) {
      console.log(`hoverOnTumbnail: ${id} ${isHover}`)
      this.currentHoverId = isHover ? id : -1
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log(`beforeRouteEnter - Explore`)
    next()
  },
   beforeRouteUpdate (to, from, next) {
    console.log(`beforeRouteUpdate - Explore`)
    next()
  },
}
</script>

<style scoped>

.title {
  font-weight: bold;
  font-size: 2em;
}

.subtitle {
  font-weight: normal;
  font-size: 0.9em;
}

header a {
  text-decoration: none;
  color: #29a6e0;
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

  header {
    padding: 0.3em 10px 0.3em 10px;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: baseline;

    background-color: white;

    z-index: 1000;
  }

  .title {
    font-size: 1.5em;
    width: 100%;
  }

  .subtitle {
    font-size: 0.7em;
    width: 100%;
    text-align: right;
  }

  .grid {
    padding-top: 10px;
  }

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
