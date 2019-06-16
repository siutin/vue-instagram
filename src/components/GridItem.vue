<template>
    <div class="item">
      <div class="content">             
        <lazy-component @show="handler">
          <div class="loading" v-show="isLoading"></div>
          <img 
            class="img" 
            v-if="isReady"
            v-lazy="getBackgroundImage(id, width)"
          />
        </lazy-component>
      </div>
    </div>
</template>
<script>

export default {
    name: 'GridItem',
    props: {
        id: Number,
        model: String,
        color: String
    },
    data () {
      return {
        width: 0,
        isLoading: true
      }
    },
    computed: {
      isReady () {
        return this.width > 0
      }
    },
    methods: {
      calculateWidth () {
        return this.$el.clientWidth
      },
      getBackgroundImage (id, width) {
        return `https://picsum.photos/id/${id}/${width}`
      },
      handler (component) {
      }
    },
    mounted () {
      this.width = this.calculateWidth()
    }
}
</script>

<style scoped>
 div.item {
   overflow: hidden;
   position: relative;
   width: 100%;
 }
 div.content {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
 }
 .img {
   height: 100%;
   width: 100%;
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
 }
 .loading {
   background-repeat: no-repeat;
   background-position: center;
   background-size: 25%;
   background-image: url(../assets/loading.gif);   
   
   height: 100%;
   width: 100%;
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
 }

 img[lazy='loaded'] {
  opacity: 0;
  animation-name: fadein;
  animation-duration: .5s;
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
