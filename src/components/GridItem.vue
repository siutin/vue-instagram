<template>
    <div class="item">
      <div class="content">
        <div v-if="isReady" class="img" :style="{ backgroundImage: `url(https://picsum.photos/id/${id}/${width})` }"></div>
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
 div.img {
   height: 100%;
   width: 100%;
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
 }
</style>
