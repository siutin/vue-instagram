<template>
    <div class="item" :style="style">
      <div class="content">
        {{ model }}
      </div>
    </div>
</template>

<script>
export default {
    name: 'GridItem',
    props: {
        model: String,
        color: String
    },
    computed: {
      style () {
        return { }
      }
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
