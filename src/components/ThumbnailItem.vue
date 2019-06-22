<template>
  <lazy-component @show="handler">
    <div class="loading"></div>
    <div
      @mouseover="isHover = true"
      @mouseleave="isHover = false">
      <img
        class="img"
        v-lazy="getBackgroundImage(id, width)"
      />
      <slot></slot>
    </div>
  </lazy-component>
</template>
<script>

export default {
    name: 'ThumbnailItem',
    props: {
        id: Number,
        width: Number
    },
    data () {
      return {
        isHover: false
      }
    },
    computed: { },
    methods: {
      getBackgroundImage (id, width) {
        return `https://picsum.photos/id/${id}/${width}`
      },
      handler (component) {
      }
    },
    watch: {
      isHover () {
        console.log("isHover detected")
        this.$emit('hover', { id: this.id, isHover: this.isHover, elm: this })
      }
    },
    mounted () {
    }
}
</script>

<style scoped>
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
