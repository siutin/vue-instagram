<template>
  <div class="messages__item__first noselect">
    <div class="profile">
      <div class="icon icon-small fade-img" v-lazy:background-image="icon"></div>
      <div class="name">{{ name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileSection',
  props: {
    id: String,
    name: String,
    icon: String
  },
   data () {
    return {}
  },
  computed: { },
  methods: { }
}
</script>

<style scoped>
.messages__item__first {
  display: flex;
  flex-direction: row;
  justify-items: center;
  justify-content: space-between;
}

.messages__item__first__right {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.messages__item .datetime {
  text-align: right;
  white-space: normal;

  font-size: 7pt;
  color: #444;
}
</style>
