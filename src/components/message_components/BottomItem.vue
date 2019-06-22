<template>
  <div class="messages__item__third">
    <div class="messages__item__third__item post-at">
      <div>{{ postAt }}</div>
    </div>
    <div class="messages__item__third__item like">
      <div>{{ getLikes }}</div>
      <div @click="clickOnLike"><img :src="getLikeImg" /></div>
    </div>
    <div class="messages__item__third__item reply" v-if="isShowReplies">
      <div>{{ this.replies }}</div>
      <div><img :src="require('@/assets/comment-white-oval-bubble.png')" /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomItem',
  props: {
    id: String,
    likes: Number,
    replies: Number,
    postAt: String
  },
   data () {
    return {
      isCurrentLiked: false
    }
  },
  computed: {
    isShowReplies() {
      return this.replies !== undefined && this.replies !== null
    },
    getLikeImg () {
      return this.isCurrentLiked ? require('@/assets/like_red.png') : require('@/assets/like_blank.png')
    },
    getLikes () {
      return this.likes + (this.isCurrentLiked ? 1 : 0)
    }
  },
  methods: {
    clickOnLike (e) {
      console.log(`clickOnLike - ${this.isCurrentLiked}`)
      this.isCurrentLiked = !this.isCurrentLiked
    }    
  }
}
</script>

<style scoped>

.messages__item__third {
  display: flex;
  flex-direction: row;
  justify-items: center;
  justify-content: space-around;

  cursor: pointer;
}

.messages__item__third div {
  font-size: 0.6em;
}

.messages__item__third .messages__item__third__item {
  font-size: 1.2em;  

  display: flex;
  flex-direction: row;
  align-items: center;
}

.messages__item__third > .messages__item__third__item > div {
  padding: 0 0.3em 0 0.3em;
}

.messages__item__third > .messages__item__third__item img {
  height: 1.4em;
}

.messages__item__third__item.reply img {
  -webkit-filter: contrast(20%);
  filter: contrast(20%);
}

.post-at {
  text-align: right;
  white-space: normal;

  font-size: 7pt;
  color: #444;
}

</style>
