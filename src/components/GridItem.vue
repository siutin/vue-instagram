<template>
    <div class="item" :style="style">
      {{ model }}
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
</style>
