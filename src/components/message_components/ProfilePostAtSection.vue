<template>
  <div class="messages__item__first">
    <div class="profile">
      <div class="icon icon-small" :style="{ backgroundImage: `url(${icon})` }"></div>
      <div class="name">{{ name }}</div>
    </div>
    <div class="messages__item__first__right">
      <div class="datetime">{{ postAt }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePostAtSection',
  props: {
    id: String,
    name: String,
    icon: String,
    postAt: String
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
