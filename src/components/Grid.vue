<template>
    <div class="grid">
       <slot></slot>
    </div>
</template>

<script>


export default {
  name: 'Grid'
}
</script>

<style scoped>
.grid {
    display: flex;
    flex-wrap: wrap;
}
</style>
