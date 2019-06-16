<template>
    <div class="item">
      <div class="content">
       <thumbnail-item v-if="isReady" :id="id" :width="width"></thumbnail-item>
      </div>
    </div>
</template>
<script>
import ThumbnailItem from './ThumbnailItem'
export default {
    name: 'GridItem',
    components: { ThumbnailItem },
    props: {
        id: Number
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
</style>
